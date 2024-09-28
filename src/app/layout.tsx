import React from "react";
import type { Metadata } from "next";
import { Sora, VT323 } from "next/font/google";
import "./globals.css";
import NavbarHero from "@/components/NavbarHero";

const sora = Sora({ subsets: ["latin"] });
const vt323 = VT323({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "SwiftForm",
  description: "AI Integrated Form Builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sora.className} bg-primary-neutral text-primary-white relative flex-col overflow-x-hidden md:flex`}
      >
        <div
          className="w-full"
          style={{
            backgroundImage: `url('/Paris.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <NavbarHero />
          {children}
        </div>
      </body>
    </html>
  );
}
