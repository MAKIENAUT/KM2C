import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { vt323 } from "@/lib/fonts";

const LINK_VALUES = [
  {
    link: "/photography",
    text: "PHOTOGRAPHY",
    img1: "/cam-icon.svg",
    img2: "/camera.svg",
  },
  {
    link: "/filmography",
    text: "FILMOGRAPHY",
    img1: "/film-icon.svg",
    img2: "/vidcam.svg",
  },
  {
    link: "/about",
    text: "ABOUT ME",
    img1: "/user-icon.svg",
    img2: "/person.svg",
  },
];

interface MenuItemProps {
  link: string;
  text: string;
  img1: string;
  img2: string;
  onClick: () => void;
}

const MenuItem = ({ link, text, img1, img2, onClick }: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={link}
      onClick={onClick}
      className="group px-2 hover:bg-white sm:px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2 text-3xl text-white group-hover:text-[#7C0A02] sm:gap-4 sm:text-5xl md:gap-8 md:text-6xl lg:text-8xl">
        <Image
          alt="menu icon"
          src={isHovered ? img2 : img1}
          width={64}
          height={64}
          className="w-8 transition-all duration-300 sm:w-12 md:w-16"
        />
        {text}
      </div>
    </Link>
  );
};

interface BaseNavbarProps {
  variant?: "transparent" | "solid";
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const BaseNavbar = ({
  variant = "transparent",
  isMenuOpen,
  setIsMenuOpen,
}: BaseNavbarProps) => {
  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={false}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className={`fixed left-0 right-0 top-0 z-50 ${
          variant === "solid"
            ? "bg-black/95 backdrop-blur-xl"
            : "bg-transparent"
        } ${isMenuOpen ? "bg-transparent" : ""}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20">
          {!isMenuOpen && (
            <Link href="/" className="cursor-pointer">
              <Image
                src="/km2c-logo.svg"
                alt="KM2C Logo"
                width={48}
                height={48}
                className="h-8 w-auto cursor-pointer transition-all duration-300 sm:h-12"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
          )}
          <div className="flex-1" />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="z-50 transition-all duration-300"
          >
            <Image
              alt="Navbar icon"
              src={isMenuOpen ? "/close-icon.svg" : "/icon-menu.svg"}
              width={40}
              height={40}
              className="w-8 transition-all duration-300 sm:w-10"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${vt323.className} fixed inset-0 z-40 min-h-screen w-screen bg-barn-red p-4 sm:p-8 md:p-16`}
          >
            <div className="mb-6 flex items-center justify-center gap-4 text-4xl text-white sm:mb-12 sm:gap-8 sm:text-6xl md:text-8xl">
              <Image
                src="/menu-dashed-line.svg"
                alt="Menu dashed line"
                width={200}
                height={2}
                className="w-1/6"
              />
              <h1>MENU</h1>
              <Image
                src="/menu-dashed-line.svg"
                alt="Menu dashed line"
                width={200}
                height={2}
                className="w-1/6"
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col gap-2 sm:gap-4">
                {LINK_VALUES.map((linkProps) => (
                  <MenuItem
                    key={linkProps.link}
                    {...linkProps}
                    onClick={() => setIsMenuOpen(false)}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};
