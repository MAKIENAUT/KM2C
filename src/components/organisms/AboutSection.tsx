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
          <h2 className={`w-fit text-6xl text-cream hover:text-chili-red`}>
            DETAILS
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-4xl text-cream">EMAIL:</h3>
              <p>kmmceralde@gmail.com</p>
            </div>
            <div>
              <h3 className="text-4xl text-cream">EDUCATION:</h3>
              <p className="flex flex-col">
                <p className="flex justify-between gap-4">
                  <span>Emerson College</span>
                  <span>2021-2024</span>
                </p>
                <span className="text-lg italic">- BFA in Film Art</span>
              </p>
              <p className="flex flex-col">
                <p className="flex justify-between gap-4">
                  <span>Paris College Of Art</span>
                  <span>2021-2024</span>
                </p>
                <span className="text-lg italic">- BFA in Film Art</span>
              </p>
            </div>
            <div>
              <h3 className="text-4xl text-cream">NUMBERS:</h3>
              <p>US - +1(312-394-9188)</p>
              <p>FR - +33(0625059385)</p>
            </div>
            <div>
              <h3 className="text-4xl text-cream">LANGUAGES:</h3>
              <p>English | Tagalog</p>
            </div>
          </div>
        </section>

        <section className={`${vt323.className} flex flex-col gap-4 text-2xl`}>
          <h2 className={`w-fit text-6xl text-cream hover:text-chili-red`}>
            RELEVANT EXPERIENCE
          </h2>

          {RELEVANT_EXPERIENCE_VALUES.map(({ title, tags, description }, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div>
                <h3 className="text-3xl text-cream">{title}</h3>
                <p className="text-lg">{tags}</p>
              </div>
              <p>{description}</p>
            </div>
          ))}
        </section>

        <section className={`${vt323.className} flex flex-col gap-4 text-2xl`}>
          <h2 className={`w-fit text-6xl text-cream hover:text-chili-red`}>
            ADDITIONAL EXPERIENCE
          </h2>

          {ADDITIONAL_EXPERIENCE_VALUES.map(
            ({ company, position, location, date }, i) => (
              <p key={i} className="flex flex-col md:text-3xl">
                <p className="flex justify-between gap-4">
                  <span>{company}</span>
                  <span>{date}</span>
                </p>
                <span className="text-lg">
                  {position} | {location}
                </span>
              </p>
            )
          )}
        </section>

        <section className={`${vt323.className} flex flex-col gap-4 text-2xl`}>
          <h2 className={`w-fit text-6xl text-cream hover:text-chili-red`}>
            SKILLS
          </h2>

          <p>{SKILLS_VALUES.join(" | ")}</p>
        </section>
      </section>
    </main>
  );
}

const RELEVANT_EXPERIENCE_VALUES = [
  {
    title: "DISKARTE",
    tags: "Director, Writer, Produced, Editor | Documentary | 2024",
    description: `Through an exploration of migration&apos;s history, Kirsten goes
                through a journey around Europe to understand the profound
                experience of being separated from one&apos;s homeland and the
                search for a new sense of belonging. The film draws upon the
                lived realities of Overseas Filipina Workers, as Kirsten
                reconnects with and reinterprets her own cultural roots.`,
  },
  {
    title: "THE ANGELS TRUMPET",
    tags: "Colorist | Shadow Puppetry | 2024",
    description: `Served as colorist for the film &apos;The Angels of
                Trumpet&apos;, applying shadow puppetry and animation techniques
                that resulted in a visually striking black-and-white film.`,
  },
  {
    title: "GOD GOT US",
    tags: "Research, Cinematographer, Editor | Documentary | 2023",
    description: `Served as a fellow researcher, cinematographer and editor in the
                14 minute film, God Got Us, an exploration of self identify in
                art. It seeks the discover of the importance within black
                ideology.`,
  },
  {
    title: "UNDERACHIEVER",
    tags: "Director, Writer | Narrative | 2022",
    description: `A coming-of-age film centered on Rooster, a naive young woman
                who, after graduating college, returns to her hometown. As she
                delivers food on her bicycle, she encounters a series of strange
                individuals who bring her deepest fears to the surface.`,
  },
];

const ADDITIONAL_EXPERIENCE_VALUES = [
  {
    company: "Dunkin Donuts",
    position: "Barista",
    location: "Boston, MA",
    date: "05/2022-08/2022",
  },
  {
    company: "Ethan Lord Jewelry",
    position: "Showroom assistant, Runner",
    location: "Chicago, IL",
    date: "10/2020-06/2021",
  },
  {
    company: "Rogers Edge Reporter",
    position: "Reporter",
    location: "Chicago, IL",
    date: "04/2018-06/2020",
  },
  {
    company: "Starbucks",
    position: "Barista",
    location: "Chicago, IL",
    date: "08/2019-12/2019",
  },
];

const SKILLS_VALUES = [
  "Premier pro",
  "Illustrator",
  "Photoshop",
  "InDesign",
  "After Effects",
  "Writer",
  "Camera Assistant",
  "Lighting Technique",
  "Pre-Production",
  "Post-Production",
];
