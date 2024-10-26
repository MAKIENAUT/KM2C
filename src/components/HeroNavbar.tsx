import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import { ChevronDown } from "lucide-react";
import { useInView } from "../hooks/useInView";
import Image from "next/image";
import { BaseNavbar } from "./BaseNavbar";

interface HeroNavbarProps {
  contentRef: React.RefObject<HTMLElement>;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const HeroNavbar = ({
  contentRef,
  isMenuOpen,
  setIsMenuOpen,
}: HeroNavbarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showHeroLogo, setShowHeroLogo] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const thresholds = Array.from({ length: 100 }, (_, i) => i / 100);

  useInView(contentRef, thresholds, (entry) => {
    const contentVisibilityThreshold = 0.5;
    setShowNavbar(entry.intersectionRatio >= contentVisibilityThreshold);
    setShowHeroLogo(entry.intersectionRatio < contentVisibilityThreshold);
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {showNavbar && (
        <BaseNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}

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

            <div className="relative flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
              {isLoaded && showHeroLogo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full text-center"
                >
                  <motion.div
                    className="xs:max-w-[300px] mx-auto w-[80%] max-w-[250px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
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
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showHeroLogo ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="xs:bottom-6 absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center sm:bottom-8 md:bottom-10 lg:bottom-12"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white/80"
              >
                <ChevronDown className="xs:h-6 xs:w-6 h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
