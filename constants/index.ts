export const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
export const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024;

export const BUNNY = {
  STREAM_BASE_URL: "https://video.bunnycdn.com/library",
  STORAGE_BASE_URL: "https://sg.storage.bunnycdn.com/snapcast",
  CDN_URL: "https://snapcast.b-cdn.net",
  EMBED_URL: "https://iframe.mediadelivery.net/embed",
  TRANSCRIPT_URL: "https://vz-47a08e64-84d.b-cdn.net",
};

export const emojis = ["😂", "😍", "👍"];

export const filterOptions = [
  "Most Viewed",
  "Most Recent",
  "Oldest First",
  "Least Viewed",
];

export const visibilities: Visibility[] = ["public", "private"];

export const ICONS = {
  record: "/assets/icons/record.svg",
  close: "/assets/icons/close.svg",
  upload: "/assets/icons/upload.svg",
};

export const initialVideoState = {
  isLoaded: false,
  hasIncrementedView: false,
  isProcessing: true,
  processingProgress: 0,
};

export const infos = ["transcript", "metadata"];

export const DEFAULT_VIDEO_CONFIG = {
  width: { ideal: 1920 },
  height: { ideal: 1080 },
  frameRate: { ideal: 30 },
};

export const DEFAULT_RECORDING_CONFIG = {
  mimeType: "video/webm;codecs=vp9,opus",
  audioBitsPerSecond: 128000,
  videoBitsPerSecond: 2500000,
};


export const dummyCards = [
  {
    id: "1",
    title: "SnapChat Message",
    thumbnail: "/assets/samples/thumbnail (1).png",
    createdAt: new Date("2025-05-01"),
    userImg: "/assets/images/jason.png",
    username: "Jason",
    views: 10,
    visibility: "public",
    duration: 156
  },
  {
    id: "2",
    title: "Instagram Story",
    thumbnail: "/assets/samples/thumbnail (2).png",
    createdAt: new Date("2025-05-03"),
    userImg: "/assets/images/sarah.png",
    username: "Sarah",
    views: 25,
    visibility: "public",
    duration: 120
  },
  {
    id: "3",
    title: "YouTube Shorts",
    thumbnail: "/assets/samples/thumbnail (3).png",
    createdAt: new Date("2025-05-05"),
    userImg: "/assets/images/michael.png",
    username: "Michael",
    views: 48,
    visibility: "private",
    duration: 95
  },
  {
    id: "4",
    title: "Twitter Clip",
    thumbnail: "/assets/samples/thumbnail (4).png",
    createdAt: new Date("2025-05-07"),
    userImg: "/assets/images/emily.png",
    username: "Emily",
    views: 33,
    visibility: "public",
    duration: 140
  },
  {
    id: "5",
    title: "TikTok Dance",
    thumbnail: "/assets/samples/thumbnail (5).png",
    createdAt: new Date("2025-05-10"),
    userImg: "/assets/images/david.png",
    username: "David",
    views: 72,
    visibility: "public",
    duration: 210
  },
  {
    id: "6",
    title: "LinkedIn Tips",
    thumbnail: "/assets/samples/thumbnail (6).png",
    createdAt: new Date("2025-05-12"),
    userImg: "/assets/images/alex.png",
    username: "Alex",
    views: 15,
    visibility: "private",
    duration: 180
  },
  {
    id: "7",
    title: "Podcast Highlight",
    thumbnail: "/assets/samples/thumbnail (7).png",
    createdAt: new Date("2025-05-15"),
    userImg: "/assets/images/jessica.png",
    username: "Jessica",
    views: 61,
    visibility: "public",
    duration: 240
  },
  {
    id: "8",
    title: "Behind the Scenes",
    thumbnail: "/assets/samples/thumbnail (8).png",
    createdAt: new Date("2025-05-18"),
    userImg: "/assets/images/lisa.png",
    username: "Lisa",
    views: 39,
    visibility: "public",
    duration: 132
  }
];
