import React from "react";
import type { Metadata } from "next";
import { spaceGrotesk, vt323 } from "@/lib/fonts";
import "./globals.css";
import NavbarHero from "@/components/HeroNavbar";

export const metadata: Metadata = {
  title: "KM2C",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.className} relative bg-black transition-all`}
      >
        {children}
      </body>
    </html>
  );
}
