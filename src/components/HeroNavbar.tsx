import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useInView } from "../hooks/useInView";

interface HeroNavbarProps {
  contentRef: React.RefObject<HTMLElement>;
}

export const HeroNavbar = ({ contentRef }: HeroNavbarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showHeroLogo, setShowHeroLogo] = useState(true);
  const [logoColorProgress, setLogoColorProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const thresholds = Array.from({ length: 100 }, (_, i) => i / 100);

  useInView(contentRef, thresholds, (entry) => {
    const contentVisibilityThreshold = 0.5;
    setShowNavbar(entry.intersectionRatio >= contentVisibilityThreshold);
    setShowHeroLogo(entry.intersectionRatio < contentVisibilityThreshold);

    // Calculate logo color transition progress
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
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const logoFilter = `brightness(0) invert(${1 - logoColorProgress})`;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={false}
        animate={{
          opacity: showNavbar ? 1 : 0,
          y: showNavbar ? 0 : -20,
        }}
        transition={{ duration: 0.4 }}
        className={`fixed left-0 right-0 top-0 z-50 bg-transparent ${
          showNavbar ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          <img
            src="/km2c-logo.svg"
            alt="KM2C Logo"
            className="h-12 w-auto transition-all duration-300"
            style={{ filter: logoFilter }}
          />
        </div>
      </motion.nav>

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
                {isLoaded && showHeroLogo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                  >
                    <motion.div
                      className="mx-auto w-[300px] md:w-[400px]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <img
                        src="/km2c-logo.svg"
                        alt="KM2C Logo"
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
              animate={{ opacity: showHeroLogo ? 1 : 0 }}
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
