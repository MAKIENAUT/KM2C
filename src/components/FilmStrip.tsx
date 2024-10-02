import Image from "next/image";
import { Button } from "./atoms/button";
import Link from "next/link";

export default function FilmStrip({
  tailwindUrl,
  imgPosition,
  slug,
}: {
  tailwindUrl: string;
  imgPosition: string;
  slug: string;
}) {
  return (
    <Button asChild variant="film-strip" size="film-strip" className="relative">
      <Link href={slug}>
        <Image
          alt="film strip"
          src="/film-strip.svg"
          width={0}
          height={0}
          className="z-10 w-80"
        />
        <div
          className={`absolute top-[16%] h-[70%] w-[95%] bg-cover ${imgPosition} ${tailwindUrl}`}
        />
      </Link>
    </Button>
  );
}
