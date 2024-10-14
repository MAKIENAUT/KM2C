"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import FilmStrip from "@/components/FilmStrip";
import { vt323 } from "@/lib/fonts";
import { PHOTO_VALUES } from "@/lib/values";
import AutoScroll from "embla-carousel-auto-scroll";

export default function PhotographyPage() {
  return (
    <section className="min-h-screen bg-black/95 pt-16 sm:pt-20 md:pt-24">
      <h1
        className={`${vt323.className} mb-4 px-4 text-4xl text-chili-red drop-shadow-glow sm:mb-6 sm:px-8 sm:text-6xl md:mb-8 md:px-16 md:text-7xl lg:text-8xl`}
      >
        PHOTOGRAPHY
      </h1>
      {PHOTO_VALUES.map(({ folderTitle, folderSrc, imgs, folderSlug }, i) => (
        <div
          key={i}
          className="mb-8 flex flex-col gap-2 sm:mb-12 sm:gap-3 md:mb-16 md:gap-4"
        >
          <h2
            className={`${vt323.className} w-fit px-2 text-3xl text-cream transition-colors hover:text-chili-red sm:text-4xl md:text-5xl lg:text-6xl`}
          >
            {folderTitle}
          </h2>
          <Carousel
            opts={{
              dragFree: true,
              loop: true,
              align: "start",
              slidesToScroll: 1,
            }}
            plugins={[
              AutoScroll({
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                speed: 0.5,
                direction: i % 2 === 0 ? "forward" : "backward",
              }),
            ]}
          >
            <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
              {imgs.map(({ imgSlug, imgSrc, imgTitle }, j) => (
                <CarouselItem key={j} className="p-0">
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
