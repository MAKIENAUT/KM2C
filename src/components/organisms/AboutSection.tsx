"use client";

import useNavbarHeightGetter from "@/hooks/useNavbarHeightGetter";
import Polaroid from "../atoms/Polaroid";
import { ABOUT_VALUES } from "@/lib/values";
import { vt323 } from "@/lib/fonts";

export default function AboutSection() {
  useNavbarHeightGetter();

  return (
    <main className="relative mx-auto mt-[var(--nav-height)] grid min-h-[calc(100vh-var(--nav-height))] max-w-7xl gap-8 px-4 py-12 pb-32 text-white sm:grid-cols-[40%_auto] md:grid-cols-[35%_auto] lg:grid-cols-[30%_auto]">
      <Polaroid
        variant="about"
        image="/Kirsten.jpeg"
        caption="Kirsten Ceralde, 2024"
        cursor="auto"
        color="text-gray-600"
      />

      <section className="flex flex-col gap-16">
        <header className="flex flex-col gap-8">
          <h1
            className={`${vt323.className} w-fit text-8xl text-cream hover:text-chili-red`}
          >
            ABOUT ME
          </h1>
          <div className="flex flex-col gap-4">
            {ABOUT_VALUES.bio.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </header>

        <section className={`${vt323.className} flex flex-col gap-4 text-2xl`}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-4xl text-cream">EMAIL:</h3>
              <p>kmmceralde@gmail.com</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
