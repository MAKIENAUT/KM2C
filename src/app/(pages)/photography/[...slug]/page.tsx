"use client";

import { vt323 } from "@/lib/fonts";
import useNavbarHeightGetter from "@/hooks/useNavbarHeightGetter";
import { PHOTO_VALUES } from "@/lib/values";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function DynamicImagePage({
  params,
}: {
  params: { slug: string };
}) {
  const [isPending, startTransition] = useTransition();
  const [currentIndex, setCurrentIndex] = useState(0);
  useNavbarHeightGetter();
  const router = useRouter();

  const currentFolder = PHOTO_VALUES.findIndex((photos) =>
    photos.folderSlug.includes(params.slug[0])
  );

  const photos = PHOTO_VALUES[currentFolder].imgs;

  useEffect(() => {
    const initialIndex = photos.findIndex(
      (photo) => photo.imgSlug.slice(1) === params.slug[1]
    );
    setCurrentIndex(initialIndex);
  }, [params.slug, photos]);

  useEffect(() => {
    const timer = setInterval(() => {
      startTransition(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [photos.length]);

  const getPhotoAtIndex = (index: number) => {
    const normalizedIndex = (index + photos.length) % photos.length;
    return photos[normalizedIndex];
  };

  const currentPhoto = getPhotoAtIndex(currentIndex);
  const prevPhotos = [
    getPhotoAtIndex(currentIndex - 2),
    getPhotoAtIndex(currentIndex - 1),
  ];
  const nextPhotos = [
    getPhotoAtIndex(currentIndex + 1),
    getPhotoAtIndex(currentIndex + 2),
  ];

  const PreviewImage = ({
    photo,
    index,
    direction,
  }: {
    photo: any;
    index: number;
    direction: "prev" | "next";
  }) => {
    const size =
      index === 0
        ? "h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 scale-110"
        : "h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20";
    const opacity = index === 0 ? "opacity-100" : "opacity-70";
    const translateX =
      direction === "prev"
        ? "-translate-x-2 sm:-translate-x-3 md:-translate-x-5"
        : "translate-x-2 sm:translate-x-3 md:translate-x-5";
    return (
      <Link
        href={`${PHOTO_VALUES[currentFolder].folderSlug}${photo.imgSlug}`}
        className={`group relative ${size} transform overflow-hidden rounded-lg transition-all ${translateX} hover:scale-105 ${opacity}`}
        onClick={(e) => {
          e.preventDefault();
          startTransition(() => {
            setCurrentIndex(
              photos.findIndex((p) => p.imgSlug === photo.imgSlug)
            );
          });
        }}
      >
        <Image
          alt={photo.imgTitle}
          src={`${PHOTO_VALUES[currentFolder].folderSrc}${photo.imgSrc}`}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 200px"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="text-xs text-white sm:text-sm">
            {direction === "prev" ? "Previous" : "Next"}
          </span>
        </div>
      </Link>
    );
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-black px-2 py-4 sm:px-4 sm:py-8">
      <div className="flex w-full max-w-7xl items-center justify-between">
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          {/* Previous Images Previews */}
          <div className="mb-4 flex w-full flex-row items-center justify-center gap-2 sm:mb-0 sm:w-1/4 sm:flex-row-reverse sm:justify-start">
            {prevPhotos.reverse().map((prevPhoto, index) => (
              <PreviewImage
                key={prevPhoto.imgSlug}
                photo={prevPhoto}
                index={index}
                direction="prev"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex w-full flex-col items-center justify-center sm:w-1/2">
            <div className="relative h-[50vh] w-full max-w-full overflow-hidden sm:h-[60vh] sm:w-[40vh] md:h-[70vh] md:w-[50vh]">
              <Image
                alt={currentPhoto?.imgTitle}
                className={`transform object-contain transition-transform duration-700 ease-in-out ${
                  isPending ? "scale-95 opacity-50" : "scale-100 opacity-100"
                }`}
                src={`${PHOTO_VALUES[currentFolder].folderSrc}${currentPhoto?.imgSrc}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 40vh, 50vh"
                loading="eager"
                priority
              />
            </div>
            <h1
              className={`${vt323.className} mt-2 text-center text-lg text-cream sm:mt-4 sm:text-xl md:text-2xl lg:text-3xl`}
            >
              {currentPhoto?.imgTitle}
            </h1>
          </div>

          {/* Next Images Previews */}
          <div className="mt-4 flex w-full items-center justify-center gap-2 sm:mt-0 sm:w-1/4 sm:justify-end">
            {nextPhotos.map((nextPhoto, index) => (
              <PreviewImage
                key={nextPhoto.imgSlug}
                photo={nextPhoto}
                index={index}
                direction="next"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Back button */}
      <Link
        href="/photography"
        className="absolute left-4 top-20 text-xs text-white hover:text-chili-red sm:left-8 sm:top-24 sm:text-sm md:text-base"
      >
        ← Back to Photography
      </Link>
    </section>
  );
}
