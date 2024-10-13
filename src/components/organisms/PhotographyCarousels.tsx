import React from "react";
import { vt323 } from "@/lib/fonts";
import { Carousel, CarouselContent, CarouselItem } from "../atoms/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import FilmStrip from "../FilmStrip";

export default function PhotographyCarousels({
  folderTitle,
  folderSrc,
  imgs,
  folderSlug,
  i,
}: PhotoCarouselProps) {
  return (
    <div className="mb-8 flex flex-col gap-2 sm:mb-12 sm:gap-4 md:mb-16">
      <h1
        className={`${vt323.className} px-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl`}
      >
        {folderTitle}
      </h1>
      <Carousel
        opts={{ dragFree: true, loop: true }}
        plugins={[
          AutoScroll({
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            speed: 0.5, // Slower speed
            direction: i % 2 === 0 ? "forward" : "backward", // Alternate direction
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {imgs.map(({ imgSlug, imgSrc, imgTitle }, j) => (
            <CarouselItem
              key={j}
              className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4"
            >
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
  );
}

type PhotoCarouselProps = {
  folderTitle: string;
  folderSrc: string;
  imgs: {
    imgSrc: string;
    imgSlug: string;
    imgTitle: string;
    imgDescription: string;
  }[];
  folderSlug: string;
  i: number;
};
