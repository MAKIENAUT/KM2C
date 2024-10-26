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
      className="group relative block transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`xs:px-3 px-2 sm:px-6 md:px-8 lg:px-10 xl:px-12 ${isHovered ? "bg-white" : ""}`}
      >
        <div
          className={`xs:text-3xl xs:gap-3 flex items-center gap-2 text-2xl transition-colors duration-300 ${isHovered ? "text-[#7C0A02]" : "text-white"} sm:gap-6 sm:text-5xl md:gap-8 md:text-6xl lg:gap-10 lg:text-7xl xl:gap-12 xl:text-8xl`}
        >
          <Image
            alt="menu icon"
            src={isHovered ? img2 : img1}
            width={64}
            height={64}
            className={`xs:w-8 w-6 transition-all duration-300 sm:w-12 md:w-14 lg:w-16 xl:w-20 ${isHovered ? "brightness-0 hue-rotate-[313deg] saturate-[10000%] sepia-[100%]" : "brightness-0 invert"}`}
          />
          {text}
        </div>
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
  variant = "solid",
  isMenuOpen,
  setIsMenuOpen,
}: BaseNavbarProps) => {
  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          variant === "solid"
            ? "bg-black/95 backdrop-blur-xl"
            : "bg-transparent"
        } ${isMenuOpen ? "bg-transparent" : ""}`}
      >
        <div className="xs:h-14 xs:px-4 md:h-18 mx-auto flex h-12 max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-6 md:px-8 lg:h-20 lg:px-10">
          {!isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link href="/" className="cursor-pointer">
                <Image
                  src="/km2c-logo.svg"
                  alt="KM2C Logo"
                  width={48}
                  height={48}
                  className="xs:h-8 h-6 w-auto cursor-pointer transition-all duration-300 hover:scale-105 sm:h-10 md:h-12 lg:h-14"
                  style={{ filter: "brightness(0) invert(1)" }}
                  priority
                />
              </Link>
            </motion.div>
          )}
          <div className="flex-1" />
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="z-50 transition-all duration-300 hover:scale-105"
          >
            <Image
              alt="Navbar icon"
              src={isMenuOpen ? "/close-icon.svg" : "/icon-menu.svg"}
              width={40}
              height={40}
              className="xs:w-7 w-6 transition-all duration-300 sm:w-8 md:w-9 lg:w-10"
              style={{ filter: "brightness(0) invert(1)" }}
              priority
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`${vt323.className} fixed inset-0 z-40 flex min-h-screen w-screen items-center justify-center bg-barn-red pt-12 sm:items-start sm:pt-16 md:pt-20 lg:pt-24 xl:pt-20`}
          >
            {/* Items Container */}
            <div className="xs:px-4 flex h-3/4 w-full flex-col items-center justify-center px-3 sm:h-full sm:px-8 md:px-10 lg:px-14 xl:px-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="xs:mb-6 xs:gap-4 xs:text-4xl mb-4 flex items-center justify-center gap-3 text-3xl text-white sm:mb-10 sm:gap-8 sm:text-6xl md:mb-12 md:gap-10 md:text-7xl lg:mb-14 lg:gap-12 lg:text-8xl xl:mb-16 xl:gap-14 xl:text-9xl"
              >
                <Image
                  src="/menu-dashed-line.svg"
                  alt="Menu dashed line"
                  width={200}
                  height={2}
                  className="w-1/6"
                  priority
                />
                <h1>MENU</h1>
                <Image
                  src="/menu-dashed-line.svg"
                  alt="Menu dashed line"
                  width={200}
                  height={2}
                  className="w-1/6"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="xs:gap-3 flex flex-col gap-2 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                  {LINK_VALUES.map((linkProps, index) => (
                    <motion.div
                      key={linkProps.link}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <MenuItem
                        {...linkProps}
                        onClick={() => setIsMenuOpen(false)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};
