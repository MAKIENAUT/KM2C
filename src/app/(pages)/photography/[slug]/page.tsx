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

  const currentIndex = PHOTO_VALUES.findIndex(
    (photo) => photo.slug === `photography/${params.slug}`
  );

  const photo = PHOTO_VALUES[currentIndex];
  const prevPhoto =
    PHOTO_VALUES[
      currentIndex - 1 < 0 ? PHOTO_VALUES.length - 1 : currentIndex - 1
    ];
  const nextPhoto =
    PHOTO_VALUES[
      currentIndex + 1 > PHOTO_VALUES.length - 1 ? 0 : currentIndex + 1
    ];

  return (
    <section className="relative flex h-[calc(100dvh-var(--nav-height))] items-center justify-center gap-8 bg-cream p-16">
      <Link
        href={prevPhoto.slug.replace("photography/", "")}
        className="absolute left-0 p-2"
      >
        <Image
          alt="left arrow icon"
          src="/left-arrow-icon.svg"
          width={0}
          height={0}
          className="w-8"
        />
      </Link>
      <div
        className={`aspect-[9/16] h-full ${photo?.tailwindUrl} bg-cover ${photo?.imgPosition}`}
      />
      <div className="flex w-1/3 flex-col gap-4">
        <h1 className={`${vt323.className} text-8xl`}>{photo?.title}</h1>
        <p>{photo?.description}</p>
      </div>
      <Link
        href={nextPhoto.slug.replace("photography/", "")}
        className="absolute right-0 p-2"
      >
        <Image
          alt="left arrow icon"
          src="/right-arrow-icon.svg"
          width={0}
          height={0}
          className="w-8"
        />
      </Link>
    </section>
  );
}
