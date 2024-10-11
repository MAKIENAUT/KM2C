"use client";
import { useRef, useState } from "react";
import { HeroNavbar } from "@/components/HeroNavbar";
import { Resume } from "@/components/Resume";
import { useInView } from "@/hooks/useInView";
import { spaceGrotesk } from "@/lib/fonts";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Increase precision of thresholds near 1.0
  const thresholds = [
    ...Array.from({ length: 90 }, (_, i) => i / 100),
    ...Array.from({ length: 100 }, (_, i) => 0.9 + i / 1000),
  ];
  const { intersectionRatio } = useInView(contentRef, thresholds);

  return (
    <body
      className={`${spaceGrotesk.className} ${isMenuOpen ? "overflow-hidden" : ""} relative bg-black transition-all`}
    >
      <main className="w-full">
        <HeroNavbar
          contentRef={contentRef}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <Resume ref={contentRef} intersectionRatio={intersectionRatio} />
      </main>
    </body>
  );
}
