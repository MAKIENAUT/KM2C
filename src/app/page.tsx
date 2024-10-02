"use client";
import { useRef } from "react";
import { HeroNavbar } from "@/components/HeroNavbar";
import { Projects } from "@/components/Projects";
import { useInView } from "@/hooks/useInView";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const thresholds = Array.from({ length: 100 }, (_, i) => i / 100);
  const { intersectionRatio } = useInView(contentRef, thresholds);

  return (
    <main className="w-full">
      <HeroNavbar contentRef={contentRef} />
      <Projects ref={contentRef} intersectionRatio={intersectionRatio} />
    </main>
  );
}
