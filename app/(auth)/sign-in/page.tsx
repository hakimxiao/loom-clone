import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={32}
            height={32}
          />
          <h1>SnapCast</h1>
        </Link>

        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 4 }).map((_, index) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="star"
                  height={20}
                  width={20}
                  key={index}
                />
              ))}
            </figure>
            <p>
              SnapCast Membantu kamu untuk melakukkan perekaman layar dan
              pembagian hasil dengan mudah.
            </p>
            <article>
              <Image
                src="/assets/images/jason.png"
                alt="jason"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2>Jason Doe</h2>
                <p>Figma Basic, UI/UX Designer</p>
              </div>
            </article>
          </section>
        </div>

        <p>© SnapCast {new Date().getFullYear()}</p>
      </aside>
      <aside className="google-sign-in">
        <section>
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              width={40}
              height={40}
            />
            <h1>SnapCast</h1>
          </Link>
          <p>
            Buat dan Bagikan, project pertamamu dengan{" "}
            <span>SnapCast Video</span>
          </p>
          <button>
            <Image
              src="/assets/icons/google.svg"
              alt="google"
              width={22}
              height={22}
            />
            <span>Sign In With Google</span>
          </button>
        </section>
      </aside>

      <div className="overlay" />
    </main>
  );
};
export default Page;
