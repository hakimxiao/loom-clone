"use server";

import { db } from "@/drizzle/db";
import { videos, user } from "@/drizzle/schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import {
  apiFetch,
  doesTitleMatch,
  getEnv,
  getOrderByClause,
  withErrorHandling,
} from "@/lib/utils";
import { BUNNY } from "@/constants";
import aj, { fixedWindow, request } from "../arcjet";

const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_LIBRARY_ID = getEnv("BUNNY_LIBRARY_ID");
const ACCESS_KEYS = {
  streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_KEY"),
  storageAccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
};

// Debug awal
console.log("[CONFIG] BUNNY:", BUNNY);
console.log("[CONFIG] BUNNY_LIBRARY_ID:", BUNNY_LIBRARY_ID);
console.log("[CONFIG] ACCESS_KEYS:", ACCESS_KEYS);

const validateWithArcjet = async (fingerPrint: string) => {
  console.log("[Arcjet] Validating fingerprint:", fingerPrint);
  const rateLimit = aj.withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 2,
      characteristics: ["fingerprint"],
    })
  );
  const req = await request();
  const decision = await rateLimit.protect(req, { fingerprint: fingerPrint });
  console.log("[Arcjet] Decision:", decision);
  if (decision.isDenied()) {
    throw new Error("Rate Limit Exceeded");
  }
};

const revalidatePaths = (paths: string[]) => {
  console.log("[Revalidate] Paths:", paths);
  paths.forEach((path) => revalidatePath(path));
};

const getSessionUserId = async (): Promise<string> => {
  console.log("[Session] Checking session...");
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("[Session] Session data:", session);
  if (!session) throw new Error("Unauthenticated");
  return session.user.id;
};

const buildVideoWithUserQuery = () =>
  db
    .select({
      video: videos,
      user: { id: user.id, name: user.name, image: user.image },
    })
    .from(videos)
    .leftJoin(user, eq(videos.userId, user.id));

export const getVideoUploadUrl = withErrorHandling(async () => {
  console.log("[getVideoUploadUrl] Start");
  const userId = await getSessionUserId();
  console.log("[getVideoUploadUrl] User ID:", userId);

  const videoResponse = await apiFetch<BunnyVideoResponse>(
    `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos`,
    {
      method: "POST",
      bunnyType: "stream",
      body: { title: "Temp Title", collectionId: "" },
    }
  );
  console.log("[getVideoUploadUrl] Bunny response:", videoResponse);

  const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoResponse.guid}`;
  return {
    videoId: videoResponse.guid,
    uploadUrl,
    accessKey: ACCESS_KEYS.streamAccessKey,
  };
});

export const getThumbnailUploadUrl = withErrorHandling(
  async (videoId: string) => {
    console.log("[getThumbnailUploadUrl] videoId:", videoId);
    const timestampedFileName = `${Date.now()}-${videoId}-thumbnail`;
    const uploadUrl = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${timestampedFileName}`;
    const cdnUrl = `${THUMBNAIL_CDN_URL}/thumbnails/${timestampedFileName}`;
    console.log("[getThumbnailUploadUrl] uploadUrl:", uploadUrl);
    console.log("[getThumbnailUploadUrl] cdnUrl:", cdnUrl);

    return {
      uploadUrl,
      cdnUrl,
      accessKey: ACCESS_KEYS.storageAccessKey,
    };
  }
);

export const saveVideoDetails = withErrorHandling(
  async (videoDetails: VideoDetails) => {
    console.log("[saveVideoDetails] Incoming details:", videoDetails);
    const userId = await getSessionUserId();
    console.log("[saveVideoDetails] userId:", userId);
    await validateWithArcjet(userId);

    const updateRes = await apiFetch(
      `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoDetails.videoId}`,
      {
        method: "POST",
        bunnyType: "stream",
        body: {
          title: videoDetails.title,
          description: videoDetails.description,
        },
      }
    );
    console.log("[saveVideoDetails] Bunny updateRes:", updateRes);

    const now = new Date();
    const dbInsert = await db.insert(videos).values({
      ...videoDetails,
      videoUrl: `${BUNNY.EMBED_URL}/${BUNNY_LIBRARY_ID}/${videoDetails.videoId}`,
      userId,
      createdAt: now,
      updatedAt: now,
    });
    console.log("[saveVideoDetails] DB insert:", dbInsert);

    revalidatePaths(["/"]);
    return { videoId: videoDetails.videoId };
  }
);

export const getAllVideos = withErrorHandling(
  async (
    searchQuery: string = "",
    sortFilter?: string,
    pageNumber: number = 1,
    pageSize: number = 8
  ) => {
    console.log("[getAllVideos] Params:", {
      searchQuery,
      sortFilter,
      pageNumber,
      pageSize,
    });
    const session = await auth.api.getSession({ headers: await headers() });
    const currentUserId = session?.user.id;
    console.log("[getAllVideos] currentUserId:", currentUserId);

    const canSeeTheVideos = or(
      eq(videos.visibility, "public"),
      eq(videos.userId, currentUserId!)
    );

    const whereCondition = searchQuery.trim()
      ? and(canSeeTheVideos, doesTitleMatch(videos, searchQuery))
      : canSeeTheVideos;

    const [{ totalCount }] = await db
      .select({ totalCount: sql<number>`count(*)` })
      .from(videos)
      .where(whereCondition);
    console.log("[getAllVideos] totalCount:", totalCount);

    const totalVideos = Number(totalCount || 0);
    const totalPages = Math.ceil(totalVideos / pageSize);

    const videoRecords = await buildVideoWithUserQuery()
      .where(whereCondition)
      .orderBy(
        sortFilter ? getOrderByClause(sortFilter) : sql`${videos.createdAt} DESC`
      )
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize);
    console.log("[getAllVideos] videoRecords:", videoRecords);

    return {
      videos: videoRecords,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalVideos,
        pageSize,
      },
    };
  }
);

