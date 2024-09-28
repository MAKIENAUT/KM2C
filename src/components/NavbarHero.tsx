"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { VT323 } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const vt323 = VT323({ subsets: ["latin"], weight: "400" });

const NavbarHero: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 400;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled ? "h-[75px] bg-transparent" : "h-screen bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-16">
        <Link
          href="/"
          className={`text-primary-white ${vt323.className} ${scrolled ? "text-4xl text-white" : "text-9xl"} transition-all duration-300 ease-in-out`}
        >
          KM2C
        </Link>
        <div
          className={`space-x-4 ${
            scrolled ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <div className="cursor-pointer text-white" onClick={toggleMenu}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
          </div>
          <div
            className={`absolute right-4 top-20 space-y-4 rounded-md bg-gray-800 p-6 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <Link href="/" className="block text-white hover:text-gray-300">
              Home
            </Link>
            <Link
              href="/about"
              className="block text-white hover:text-gray-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-white hover:text-gray-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHero;
