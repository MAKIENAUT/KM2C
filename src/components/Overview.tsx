import { motion, useScroll, useTransform } from "framer-motion";
import { forwardRef, useRef, useEffect } from "react";
import { Mail, Languages } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ResumeProps {
  intersectionRatio: number;
}

interface PolaroidProps {
  image: string;
  caption: string;
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
    className={`relative flex flex-col items-center bg-white p-3 shadow-xl sm:p-3 md:p-4 lg:p-5 cursor-${cursor} ${className}`}
    initial={false}
  >
    {/* Pin element positioned at top center */}
    <div className="absolute -top-5 left-1/2 -translate-x-1/2 sm:-top-5 md:-top-6 lg:-top-8">
      <div className="h-4 w-3 bg-zinc-300 sm:h-4 sm:w-3 md:h-6 md:w-4 lg:h-8 lg:w-6" />
    </div>

    {/* Image container */}
    <div className={`flex w-full flex-col cursor-${cursor}`}>
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
        className={`font-handwriting mt-3 text-left text-sm sm:mt-3 sm:text-sm md:mt-4 md:text-base lg:mt-5 lg:text-lg cursor-${cursor} ${color}`}
      >
        {caption}
      </div>
    </div>
  </motion.div>
);

const PolaroidStack = () => {
  return (
    <motion.div
      className="flex h-[280px] w-44 items-center justify-center sm:h-[300px] sm:w-48 md:h-[400px] md:w-64 lg:h-[500px] lg:w-80"
      whileHover="hover"
      initial="initial"
      animate="initial"
    >
      <div className="relative flex">
        {/* Back Polaroid - More About Me */}
        <Link href="/about" className="absolute">
          <motion.div
            className="origin-top cursor-pointer"
            variants={{
              initial: { rotate: 0 },
              hover: {
                rotate: 20,
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
          className="relative z-10 origin-top"
          variants={{
            initial: { rotate: 0 },
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
      </div>
    </motion.div>
  );
};

export const Resume = forwardRef<HTMLElement, ResumeProps>(
  ({ intersectionRatio }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      container: containerRef,
    });

    const profileY = useTransform(scrollYProgress, [0, 12], [0, -30]);

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
        className="flex h-screen cursor-default items-center justify-center bg-black"
      >
        <div
          ref={containerRef}
          className={`scrollbar-hide flex h-full w-full items-center justify-center overflow-y-scroll transition-opacity duration-300 ${
            intersectionRatio < 0.99
              ? "pointer-events-none opacity-50"
              : "opacity-100"
          }`}
        >
          <div className="flex h-3/4 w-11/12 items-center justify-center sm:w-11/12 md:w-5/6 lg:w-3/4">
            {/* Header Section with Profile */}
            <motion.div
              style={{ y: profileY }}
              className="flex flex-col items-center justify-center sm:flex-row"
            >
              <div className="flex w-full flex-col items-center gap-6 sm:w-auto sm:flex-row sm:items-center sm:gap-8 md:gap-12 lg:gap-16">
                <PolaroidStack />
                {/* Name and Contact Info */}
                <motion.div
                  className="mt-8 flex w-full flex-col items-center justify-center sm:mt-0 sm:w-auto sm:items-start"
                  whileHover="hover"
                  initial="initial"
                  animate="initial"
                >
                  <motion.div
                    className="w-full text-center sm:text-left"
                    variants={{
                      initial: { y: 0, scale: 1 },
                      hover: {
                        y: 0,
                        scale: 1.05,
                        transition: { duration: 0.3, ease: "easeOut" },
                      },
                    }}
                  >
                    <h2 className="text-2xl font-bold text-cream sm:text-3xl md:text-5xl lg:text-7xl">
                      KIRSTEN
                    </h2>
                    <h2 className="text-2xl font-bold text-cream sm:text-3xl md:text-5xl lg:text-7xl">
                      CERALDE
                    </h2>
                  </motion.div>

                  <motion.div
                    className="mt-4 flex flex-col items-center gap-3 text-gray-300 sm:mt-4 sm:items-start sm:gap-3 md:mt-5 md:gap-4 lg:mt-6"
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
                        className="flex w-full items-center justify-center gap-2 text-sm sm:w-auto sm:justify-start sm:text-sm md:text-base lg:text-lg"
                        variants={{
                          initial: { opacity: 0, y: -20 },
                          hover: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3, ease: "easeOut" },
                          },
                        }}
                      >
                        <info.icon className="text-red-500" size={20} />
                        <span>{info.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="space-y-8 sm:space-y-8 md:space-y-12 lg:space-y-16">
              {/* Bio Section */}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Resume.displayName = "Resume";
