"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import FilmStrip from "@/components/FilmStrip";
import { vt323 } from "@/lib/fonts";
import { PHOTO_VALUES } from "@/lib/values";

export default function PhotographyPage() {
  return (
    <section className="bg-cream py-2">
      <h1 className={`${vt323.className} mb-4 px-16 text-8xl text-maroon`}>
        PHOTOGRAPHY
      </h1>
      {PHOTO_VALUES.map(({ folderTitle, folderSrc, imgs, folderSlug }, i) => (
        <div key={i} className="mb-16 flex flex-col gap-2">
          <h1 className={`${vt323.className} px-2 text-6xl text-maroon`}>
            {folderTitle}
          </h1>
          <Carousel
            opts={{ dragFree: true, loop: true }}
            plugins={[
              AutoScroll({ stopOnInteraction: false, stopOnMouseEnter: true }),
            ]}
          >
            <CarouselContent className="m-0">
              {imgs.map(({ imgSlug, imgSrc, imgTitle }, i) => (
                <CarouselItem key={i} className="p-0">
                  <FilmStrip
                    src={`${folderSrc}${imgSrc}`}
                    title={imgTitle}
                    slug={`${folderSlug}${imgSlug}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ))}
    </section>
  );
}
