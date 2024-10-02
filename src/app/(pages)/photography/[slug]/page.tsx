"use client";

import { vt323 } from "@/lib/fonts";
import useNavbarHeightGetter from "@/lib/useNavbarHeightGetter";
import { PHOTO_VALUES } from "@/lib/values";

export default function DynamicImagePage({
  params,
}: {
  params: { slug: string };
}) {
  useNavbarHeightGetter();
  const photo = PHOTO_VALUES.find(
    (photo) => photo.slug === `photography/${params.slug}`
  );

  return (
    <section className="flex h-[calc(100dvh-var(--nav-height))] items-center gap-16 bg-cream p-16">
      <div
        className={`aspect-[9/16] h-full ${photo?.tailwindUrl} bg-cover ${photo?.imgPosition}`}
      />
      <div className="flex flex-col gap-4">
        <h1 className={`${vt323.className} text-8xl`}>{photo?.title}</h1>
        <p>{photo?.description}</p>
      </div>
    </section>
  );
}
