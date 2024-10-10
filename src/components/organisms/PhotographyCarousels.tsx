"use client";

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
    <div className="mb-16 flex flex-col gap-2">
      <h1 className={`${vt323.className} px-2 text-6xl`}>{folderTitle}</h1>
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
      >
        <CarouselContent className="m-0">
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
