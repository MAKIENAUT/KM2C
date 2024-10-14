import { motion, useScroll, useTransform } from "framer-motion";
import { forwardRef, useRef, useEffect } from "react";
import { Mail, Phone, Languages, Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ResumeProps {
  intersectionRatio: number;
}

interface PolaroidProps {
  image: string;
  caption: string;
  isBack?: boolean;
  className?: string;
  cursor?: string;
  color?: string;
}

const contactInfo = [
  {
    icon: Mail,
    text: "Kmmceralde@gmail.com",
    delay: 0,
  },

  {
    icon: Languages,
    text: "English, Tagalog",
    delay: 0.2,
  },
];

const Polaroid = ({
  image,
  caption,
  className = "",
  cursor = "",
  color = "",
}: PolaroidProps) => (
  <motion.div
    className={`absolute bg-white p-2 shadow-xl sm:p-3 md:p-4 cursor-${cursor} ${className}`}
    initial={false}
  >
    <div className={`relative aspect-[4/5] cursor-${cursor}`}>
      <Image
        src={image}
        alt={caption}
        width={400}
        height={500}
        className={`h-full w-full object-cover cursor-${cursor}`}
      />
    </div>
    <div
      className={`font-handwriting mt-2 text-left text-xs sm:mt-3 sm:text-sm md:mt-4 cursor-${cursor} ${color}`}
    >
      {caption}
    </div>
    <div className="absolute -top-2 left-1/2 h-4 w-3 -translate-x-1/2 bg-zinc-300 sm:-top-3 sm:h-6 sm:w-4 md:-top-4 md:h-8 md:w-6" />
  </motion.div>
);

const PolaroidStack = () => {
  return (
    <motion.div
      className="group relative h-[250px] w-40 sm:h-[300px] sm:w-48 md:h-[400px] md:w-64 lg:h-[500px] lg:w-80"
      whileHover="hover"
      initial="initial"
      animate="initial"
    >
      {/* Back Polaroid - More About Me */}
      <Link href="/about" className="block">
        <motion.div
          className="relative left-0 top-0 z-0 cursor-pointer"
          variants={{
            initial: {
              rotate: 0,
            },
            hover: {
              rotate: 14,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
          }}
        >
          <Polaroid
            image="/Kirsten.jpeg"
            caption="Click: More About Me..."
            className="cursor-pointer"
            cursor="pointer"
            color="text-red-500"
          />
        </motion.div>
      </Link>

      {/* Front Polaroid - Profile Picture */}
      <motion.div
        className="relative z-10"
        variants={{
          initial: {
            rotate: 0,
          },
          hover: {
            rotate: -14,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
        }}
      >
        <Polaroid
          image="/Kirsten.jpeg"
          caption="Kirsten Ceralde, 2024"
          cursor="auto"
          color="text-gray-600"
        />
      </motion.div>
    </motion.div>
  );
};

export const Resume = forwardRef<HTMLElement, ResumeProps>(
  ({ intersectionRatio }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      container: containerRef,
    });

    const profileY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
    const bioY = useTransform(scrollYProgress, [0.1, 0.3], [30, -30]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (e: WheelEvent) => {
        if (intersectionRatio < 0.99) {
          e.preventDefault();
        }
      };

      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }, [intersectionRatio]);

    return (
      <section
        ref={ref}
        className="relative h-screen cursor-default bg-black pt-6 sm:pt-10 md:pt-16 lg:pt-20"
      >
        <div
          ref={containerRef}
          className={`scrollbar-hide flex h-full justify-center overflow-y-scroll transition-opacity duration-300 ${
            intersectionRatio < 0.99
              ? "pointer-events-none opacity-50"
              : "opacity-100"
          }`}
        >
          <div className="max-w-7xl px-4 py-6 sm:py-8 md:py-12 lg:py-16">
            {/* Header Section with Profile */}
            <motion.div
              style={{ y: profileY }}
              className="mb-6 flex flex-col items-center justify-center sm:mb-8 sm:flex-row md:mb-12 lg:mb-16"
            >
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8 md:gap-12 lg:gap-16">
                <PolaroidStack />

                {/* Name and Contact Info */}
                <motion.div
                  className="group mt-6 flex-col justify-center sm:mt-0"
                  whileHover="hover"
                  initial="initial"
                  animate="initial"
                >
                  <motion.div
                    variants={{
                      initial: {
                        y: 0,
                        scale: 1,
                      },
                      hover: {
                        y: 0,
                        scale: 1.05,
                        transition: {
                          duration: 0.3,
                          ease: "easeOut",
                        },
                      },
                    }}
                  >
                    <h2 className="text-center text-2xl font-bold text-cream sm:text-left sm:text-3xl md:text-5xl lg:text-7xl">
                      KIRSTEN
                    </h2>
                    <h2 className="text-center text-2xl font-bold text-cream sm:text-left sm:text-3xl md:text-5xl lg:text-7xl">
                      CERALDE
                    </h2>
                  </motion.div>

                  <motion.div
                    className="mt-3 flex flex-col gap-2 text-gray-300 sm:mt-4 sm:gap-3 md:mt-5 md:gap-4 lg:mt-6"
                    variants={{
                      initial: {
                        opacity: 0,
                        height: 0,
                        marginTop: 0,
                      },
                      hover: {
                        opacity: 1,
                        height: "auto",
                        marginTop: 16,
                        transition: {
                          duration: 0.3,
                          ease: "easeOut",
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 text-xs sm:text-sm md:text-base"
                        variants={{
                          initial: {
                            opacity: 0,
                            y: -20,
                          },
                          hover: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.3,
                              ease: "easeOut",
                            },
                          },
                        }}
                      >
                        <info.icon className="text-red-500" size={16} />
                        <span>{info.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-24">
              {/* Bio Section */}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-0 top-0 h-12 w-full bg-gradient-to-b from-black/50 to-transparent sm:h-16 md:h-24 lg:h-32" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-gradient-to-t from-black/50 to-transparent sm:h-16 md:h-24 lg:h-32" />
      </section>
    );
  }
);

Resume.displayName = "Resume";
