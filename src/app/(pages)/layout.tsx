"use client";

import { BaseNavbar } from "@/components/BaseNavbar";
import { spaceGrotesk } from "@/lib/fonts";
import { useState } from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <body
      className={`${spaceGrotesk.className} ${isMenuOpen ? "overflow-hidden" : ""} relative bg-black transition-all`}
    >
      <BaseNavbar
        variant="solid"
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      {children}
    </body>
  );
}
