"use client";
import { useRef } from "react";
import { HeroNavbar } from "@/components/HeroNavbar";
import { Resume } from "@/components/Resume";
import { useInView } from "@/hooks/useInView";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  // Increase precision of thresholds near 1.0
  const thresholds = [
    ...Array.from({ length: 90 }, (_, i) => i / 100),
    ...Array.from({ length: 100 }, (_, i) => 0.9 + i / 1000),
  ];
  const { intersectionRatio } = useInView(contentRef, thresholds);

  return (
    <main className="w-full">
      <HeroNavbar contentRef={contentRef} />
      <Resume ref={contentRef} intersectionRatio={intersectionRatio} />
    </main>
  );
}
