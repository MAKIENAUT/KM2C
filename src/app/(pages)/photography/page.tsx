import { vt323 } from "@/lib/fonts";
import { PHOTO_VALUES } from "@/lib/values";
import PhotographyCarousels from "@/components/organisms/PhotographyCarousels";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KM2C - Photography",
};

export default function PhotographyPage() {
  return (
    <section className="py-2 text-cream">
      <h1 className={`${vt323.className} mb-4 px-16 text-8xl`}>PHOTOGRAPHY</h1>
      {PHOTO_VALUES.map((photo, i) => (
        <PhotographyCarousels key={i} {...photo} i={i} />
      ))}
    </section>
  );
}
