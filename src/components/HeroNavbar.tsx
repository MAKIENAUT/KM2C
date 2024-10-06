import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useInView } from "../hooks/useInView";
import Image from "next/image";
import Link from "next/link";
import { vt323 } from "@/lib/fonts";

interface HeroNavbarProps {
  contentRef: React.RefObject<HTMLElement>;
}

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
    link: "/about-me",
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
      className="group px-4 hover:bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-8 text-8xl text-white group-hover:text-[#7C0A02]">
        <Image
          alt="menu icon"
          src={isHovered ? img2 : img1}
          width={64}
          height={64}
          className="w-16 transition-all duration-300"
        />
        {text}
      </div>
    </Link>
  );
};

export const HeroNavbar = ({ contentRef }: HeroNavbarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showHeroLogo, setShowHeroLogo] = useState(true);
  const [logoColorProgress, setLogoColorProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const thresholds = Array.from({ length: 100 }, (_, i) => i / 100);

  useInView(contentRef, thresholds, (entry) => {
    if (!isMenuOpen) {
      const contentVisibilityThreshold = 0.5;
      setShowNavbar(entry.intersectionRatio >= contentVisibilityThreshold);
      setShowHeroLogo(entry.intersectionRatio < contentVisibilityThreshold);

      const transitionStart = 0.6;
      const transitionEnd = 0.8;
      const progress = Math.max(
        0,
        Math.min(
          1,
          (entry.intersectionRatio - transitionStart) /
            (transitionEnd - transitionStart)
        )
      );
      setLogoColorProgress(progress);
    }
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const menuIconFilter = isMenuOpen
    ? "brightness(0) invert(1)"
    : `brightness(0) invert(${showHeroLogo ? 1 : 0})`;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={false}
        animate={{
          opacity: isMenuOpen ? 1 : showNavbar ? 1 : 0,
          y: isMenuOpen ? 0 : showNavbar ? 0 : -20,
        }}
        transition={{ duration: 0.4 }}
        className={`fixed left-0 right-0 top-0 z-50 bg-transparent ${
          isMenuOpen || showNavbar
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          {!isMenuOpen && (
            <Image
              src="/km2c-logo.svg"
              alt="KM2C Logo"
              width={48}
              height={48}
              className="h-12 w-auto transition-all duration-300"
              style={{ filter: menuIconFilter }}
            />
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
              className="transition-all duration-300"
              style={{ filter: menuIconFilter }}
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
            className={`${vt323.className} fixed inset-0 z-40 min-h-screen w-screen bg-barn-red p-16`}
          >
            <div className="mb-12 flex items-center justify-center gap-8 text-8xl text-white">
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
              <div className="flex flex-col gap-4">
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

      {/* Hero Section */}
      <div ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div
            style={{ y: imageY, scale }}
            className="absolute inset-0 -top-[10%] h-[120%] w-full"
          >
            <div
              className="h-full w-full bg-[url('/home.jpg')] bg-cover bg-center transition-all duration-700 ease-out"
              style={{
                backgroundPosition: "50% 50%",
                filter: "brightness(0.85)",
              }}
            />
          </motion.div>

          <motion.div style={{ opacity }} className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

            <div className="relative flex h-full flex-col items-center justify-center px-4">
              <AnimatePresence>
                {isLoaded && showHeroLogo && !isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                  >
                    <motion.div
                      className="mx-auto w-[600px]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src="/km2c-logo.svg"
                        alt="KM2C Logo"
                        width={600}
                        height={200}
                        className="w-full"
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showHeroLogo && !isMenuOpen ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white/80"
              >
                <ChevronDown className="h-8 w-8" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
