"use client";

import useNavbarHeightGetter from "@/hooks/useNavbarHeightGetter";
import Polaroid from "../atoms/Polaroid";
import { ABOUT_VALUES } from "@/lib/values";
import { vt323 } from "@/lib/fonts";

export default function AboutSection() {
  useNavbarHeightGetter();

  return (
    <main className="relative mx-auto grid h-[calc(100vh-var(--nav-height))] max-w-7xl grid-cols-[25%_auto] gap-8 px-4 py-12 text-white">
      <Polaroid
        variant="about"
        image="/Kirsten.jpeg"
        caption="Kirsten Ceralde, 2024"
        cursor="auto"
        color="text-gray-600"
      />
      <section className="flex flex-col gap-8">
        <h1 className={`${vt323.className} text-8xl text-cream`}>ABOUT ME</h1>
        <div className="flex flex-col gap-4">
          {ABOUT_VALUES.bio.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
