"use client";

import { vt323 } from "@/lib/fonts";
import useNavbarHeightGetter from "@/hooks/useNavbarHeightGetter";
import { PHOTO_VALUES } from "@/lib/values";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DynamicImagePage({
  params,
}: {
  params: { slug: string };
}) {
  const [imageLoading, setImageLoading] = useState(true);
  useNavbarHeightGetter();
  const router = useRouter();

  const currentFolder = PHOTO_VALUES.findIndex((photos) =>
    photos.folderSlug.includes(params.slug[0])
  );

  const currentIndex = PHOTO_VALUES[currentFolder].imgs.findIndex(
    (photo) => photo.imgSlug.slice(1) === params.slug[1]
  );

  const photo = PHOTO_VALUES[currentFolder].imgs[currentIndex];

  const prevPhoto =
    currentIndex === 0
      ? PHOTO_VALUES[currentFolder].imgs[
          PHOTO_VALUES[currentFolder].imgs.length - 1
        ]
      : PHOTO_VALUES[currentFolder].imgs[currentIndex - 1];

  const nextPhoto =
    currentIndex === PHOTO_VALUES[currentFolder].imgs.length - 1
      ? PHOTO_VALUES[currentFolder].imgs[0]
      : PHOTO_VALUES[currentFolder].imgs[currentIndex + 1];

  return (
    <section className="width-full relative box-border flex min-h-screen items-center justify-center bg-black px-4 py-8 md:px-8">
      <Link
        href={`${PHOTO_VALUES[currentFolder].folderSlug}${prevPhoto?.imgSlug}`}
        className="group absolute left-2 z-10 p-2 transition-colors hover:bg-red-600 md:left-4"
      >
        <Image
          alt="left arrow icon"
          src="/left-arrow-icon.svg"
          width={0}
          height={0}
          className="w-6 invert group-hover:brightness-100 md:w-8"
        />
      </Link>
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-4 md:grid-cols-[35%_auto] md:gap-8">
        <div className="group relative mx-auto w-full rotate-[-2deg] transition-transform duration-300 hover:rotate-0 md:mx-0 md:w-[400px]">
          {/* Polaroid frame */}
          <div className="relative aspect-[0.85] w-full rounded-sm bg-white p-4 shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
            {/* Image container with development effect */}
            <div className="relative h-[calc(100%-48px)] w-full overflow-hidden bg-black">
              <Image
                alt={photo?.imgTitle}
                className={`duration-[4s] object-contain transition-all ${
                  imageLoading
                    ? "scale-105 blur-xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                }`}
                src={`${PHOTO_VALUES[currentFolder].folderSrc}${photo?.imgSrc}`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                loading="lazy"
                onLoadingComplete={() => setImageLoading(false)}
                priority={false}
              />
              {/* Development overlay */}
              <div
                className={`duration-[3s] absolute inset-0 z-10 bg-white transition-opacity ${
                  imageLoading ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Polaroid bottom area with caption */}
            <div className="absolute bottom-4 left-4 right-4 flex h-12 items-center justify-center">
              <p className="font-handwriting text-center text-xs text-gray-600 md:text-sm">
                {photo?.imgTitle}
              </p>
            </div>
          </div>

          {/* Polaroid stack effect */}
          <div className="absolute -bottom-2 -right-2 -z-10 h-full w-full rotate-2 rounded-sm bg-white shadow-md" />
          <div className="rotate-4 absolute -bottom-4 -right-4 -z-20 h-full w-full rounded-sm bg-white shadow-md" />
        </div>

        <div className="mt-8 flex flex-col gap-4 text-cream md:mt-0">
          <h1 className={`${vt323.className} text-4xl sm:text-6xl md:text-8xl`}>
            {photo?.imgTitle}
          </h1>
          <p className="text-sm opacity-90 md:text-base">
            {photo?.imgDescription}
          </p>
        </div>
      </div>

      <Link
        href={`${PHOTO_VALUES[currentFolder].folderSlug}${nextPhoto?.imgSlug}`}
        className="group absolute right-2 z-10 p-2 transition-colors hover:bg-red-600 md:right-4"
      >
        <Image
          alt="right arrow icon"
          src="/right-arrow-icon.svg"
          width={0}
          height={0}
          className="w-6 invert group-hover:brightness-100 md:w-8"
        />
      </Link>

      {/* Back button */}
      <button
        onClick={() => router.push("/photography")}
        className="absolute right-4 top-4 text-sm text-white hover:text-chili-red md:right-8 md:top-8 md:text-base"
      >
        Back to Photography
      </button>

      {/* Add @font-face for handwriting font */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Kalam&display=swap");

        .font-handwriting {
          font-family: "Kalam", cursive;
        }
      `}</style>
    </section>
  );
}
