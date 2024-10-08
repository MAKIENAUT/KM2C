"use client";

import { vt323 } from "@/lib/fonts";
import useNavbarHeightGetter from "@/hooks/useNavbarHeightGetter";
import { PHOTO_VALUES } from "@/lib/values";
import Image from "next/image";
import Link from "next/link";

export default function DynamicImagePage({
  params,
}: {
  params: { slug: string };
}) {
  useNavbarHeightGetter();

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
    <section className="relative grid h-[calc(100dvh-var(--nav-height))] grid-cols-[40%_auto] items-center justify-center gap-8 bg-cream px-24 py-16">
      <Link
        href={`${PHOTO_VALUES[currentFolder].folderSlug}${prevPhoto?.imgSlug}`}
        className="group absolute left-4 p-2 hover:bg-maroon"
      >
        <Image
          alt="left arrow icon"
          src="/left-arrow-icon.svg"
          width={0}
          height={0}
          className="w-8 group-hover:invert"
        />
      </Link>
      <Image
        alt={photo?.imgTitle}
        className="h-full object-cover object-center"
        src={`${PHOTO_VALUES[currentFolder].folderSrc}${photo?.imgSrc}`}
        width={2000}
        height={2000}
      />
      <div className="flex flex-col gap-4">
        <h1 className={`${vt323.className} text-8xl`}>{photo?.imgTitle}</h1>
        <p>{photo?.imgDescription}</p>
      </div>
      <Link
        href={`${PHOTO_VALUES[currentFolder].folderSlug}${nextPhoto?.imgSlug}`}
        className="group absolute right-4 p-2 hover:bg-maroon"
      >
        <Image
          alt="left arrow icon"
          src="/right-arrow-icon.svg"
          width={0}
          height={0}
          className="w-8 group-hover:invert"
        />
      </Link>
    </section>
  );
}
