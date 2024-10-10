"use client";

import { BaseNavbar } from "@/components/BaseNavbar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BaseNavbar />
      {children}
    </>
  );
}
