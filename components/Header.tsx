import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ICONS } from "@/constants";
import DropdownList from "./DropdownList";
import RecordScreen from "./RecordScreen";

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  return (
    <header className="header">
      <section className="header-container">
        <div className="details">
          {userImg && (
            <Image
              src={userImg || "/assets/images/dumy.jpg"}
              alt="User"
              width={66}
              height={66}
              className="rounded-full"
            />
          )}

          <article>
            <p>{subHeader}</p>
            <h1>{title}</h1>
          </article>
        </div>

        <aside>
          <Link href="/upload">
            <Image
              src="/assets/icons/upload.svg"
              alt="Upload"
              width={16}
              height={16}
            />
            <span>Upload a video</span>
          </Link>
          <RecordScreen />
        </aside>
      </section>

      <section className="search-filter">
        <div className="search">
          <input
            type="text"
            placeholder="search for videos, tags, folders..."
          />

          <Image
            src="/assets/icons/search.svg"
            alt="search"
            height={16}
            width={16}
          />
        </div>

        <DropdownList />
      </section>
    </header>
  );
};
export default Header;
