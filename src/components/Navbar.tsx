"use client";

import Image from "next/image";
import { Button } from "./atoms/button";
import Link from "next/link";
import { useState } from "react";
import { vt323 } from "@/lib/fonts";

const LINK_VALUES = [
  {
    link: "/photography",
    text: "PHOTOGRAPHY",
    img: "/cam-icon.svg",
  },
  {
    link: "/filmography",
    text: "FILMOGRAPHY",
    img: "/film-icon.svg",
  },
  {
    link: "/about-me",
    text: "ABOUT ME",
    img: "/user-icon.svg",
  },
];

export default function Navbar({ inView }: { inView: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {isMenuOpen ? (
        <nav className="fixed top-0 z-50 flex w-screen justify-end px-16 py-4 text-white">
          <Button
            variant="menu"
            size="menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Image
              alt="Navbar icon"
              src="/close-icon.svg"
              width={0}
              height={0}
              className={`size-10`}
            />
          </Button>
        </nav>
      ) : (
        <nav className="fixed top-0 z-50 flex w-screen justify-between px-16 py-4 text-white">
          <Link href="#">
            <Image
              alt="Navbar icon"
              src="/km2c-logo.svg"
              width={0}
              height={0}
              className={`${inView ? "w-16 invert" : "hidden"}`}
            />
          </Link>
          <Button
            variant="menu"
            size="menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Image
              alt="Navbar icon"
              src="/icon-menu.svg"
              width={0}
              height={0}
              className={`${inView ? "invert" : ""} size-10`}
            />
          </Button>
        </nav>
      )}
      <section
        className={`${isMenuOpen ? "" : "hidden"} ${vt323.className} fixed top-0 z-40 min-h-screen w-screen bg-barn-red p-16`}
      >
        <div
          className={`mb-12 flex items-center justify-center gap-8 text-8xl text-white`}
        >
          <Image
            src="/menu-dashed-line.svg"
            alt="Menu dashed line"
            width={0}
            height={0}
            className="w-1/6"
          />
          <h1>MENU</h1>
          <Image
            src="/menu-dashed-line.svg"
            alt="Menu dashed line"
            width={0}
            height={0}
            className="w-1/6"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-4">
            {LINK_VALUES.map(({ link, text, img }) => (
              <Link key={link} href={link}>
                <div className={`flex items-center gap-8 text-8xl text-white`}>
                  <Image
                    alt="menu icon"
                    src={img}
                    width={0}
                    height={0}
                    className={`${img === "/menu-user-icon.svg" ? "w-10" : "w-16"}`}
                  />
                  {text}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
