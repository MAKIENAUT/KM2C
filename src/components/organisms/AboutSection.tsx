"use client";

import useNavbarHeightGetter from "@/hooks/useNavbarHeightGetter";
import Polaroid from "../atoms/Polaroid";
import { ABOUT_VALUES } from "@/lib/values";
import { vt323 } from "@/lib/fonts";

export default function AboutSection() {
  useNavbarHeightGetter();

  return (
    <main className="relative mx-auto mt-[var(--nav-height)] min-h-[calc(100vh-var(--nav-height))] max-w-7xl px-4 py-6 text-white sm:py-8 md:py-10 lg:py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_2fr] sm:gap-8 md:gap-10 lg:grid-cols-[25%_auto] lg:gap-12">
        <div className="mx-auto w-3/4 max-w-[300px] sm:mx-0 sm:w-full sm:max-w-none">
          <Polaroid
            variant="about"
            image="/Kirsten.jpeg"
            caption="Kirsten Ceralde, 2024"
            cursor="auto"
            color="text-gray-600"
          />
        </div>
        <section className="flex flex-col gap-4 sm:gap-6 md:gap-8">
          <h1
            className={`${vt323.className} text-center text-4xl text-cream sm:text-left sm:text-5xl md:text-6xl lg:text-8xl`}
          >
            ABOUT ME
          </h1>
          <div className="flex flex-col gap-3 sm:gap-4">
            {ABOUT_VALUES.bio.map((text, i) => (
              <p key={i} className="text-sm sm:text-base md:text-lg">
                {text}
              </p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
