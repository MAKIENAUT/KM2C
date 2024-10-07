import Image from "next/image";
import { Button } from "./atoms/button";
import Link from "next/link";

export default function FilmStrip({ src, title, slug }: FilmStripProps) {
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
        <Image
          alt={title}
          className={`absolute top-[16%] h-[70%] w-[95%] object-cover object-center`}
          src={src}
          width={2000}
          height={2000}
        />
      </Link>
    </Button>
  );
}

type FilmStripProps = {
  src: string;
  title: string;
  slug: string;
};
