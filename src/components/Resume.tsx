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
    icon: Phone,
    text: "US +1(312-394-9188) | FR +33(0625059385)",
    delay: 0.1,
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
    className={`absolute bg-white p-4 shadow-xl cursor-${cursor} ${className}`}
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
      className={`font-handwriting mt-4 text-left cursor-${cursor} ${color}`}
    >
      {caption}
    </div>
    <div className="absolute -top-4 left-1/2 h-8 w-6 -translate-x-1/2 bg-zinc-300" />
  </motion.div>
);

const PolaroidStack = () => {
  return (
    <motion.div
      className="group relative h-[500px] w-80"
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
            color="text-amber-500"
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
        className="relative h-screen cursor-default bg-gradient-to-br from-cream to-gray-50 pt-20"
      >
        <div
          ref={containerRef}
          className={`scrollbar-hide flex h-full justify-center overflow-y-scroll transition-opacity duration-300 ${
            intersectionRatio < 0.99
              ? "pointer-events-none opacity-50"
              : "opacity-100"
          }`}
        >
          <div className="max-w-7xl px-4 py-16">
            {/* Header Section with Profile */}
            <motion.div
              style={{ y: profileY }}
              className="mb-16 flex justify-center"
            >
              <div className="flex items-center gap-16">
                <PolaroidStack />

                {/* Name and Contact Info - Keep existing code */}
                <motion.div
                  className="group flex-col justify-center"
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
                    <h2 className="text-5xl font-bold text-gray-900 md:text-7xl">
                      KIRSTEN
                    </h2>
                    <h2 className="text-5xl font-bold text-gray-900 md:text-7xl">
                      CERALDE
                    </h2>
                  </motion.div>

                  <motion.div
                    className="mt-6 flex flex-col gap-4 text-gray-600"
                    variants={{
                      initial: {
                        opacity: 0,
                        height: 0,
                        marginTop: 0,
                      },
                      hover: {
                        opacity: 1,
                        height: "auto",
                        marginTop: 24,
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
                        className="flex items-center gap-2"
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
                        <info.icon className="text-orange-500" size={18} />
                        <span>{info.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="space-y-24">
              {/* Bio Section */}
              <motion.div
                style={{ y: bioY }}
                className="relative mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg"
              >
                <div className="absolute -left-4 -top-4 rounded-full bg-orange-100 p-4">
                  <Camera className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                  About Me
                </h3>
                <p className="leading-relaxed text-gray-600">
                  A filmmaker based in Paris, France, with a dual degree in Film
                  Art from studies across Paris, the Netherlands, and Boston.
                  Through the Global Bachelors of Film Art (GBFA) program,
                  I&apos;ve developed comprehensive expertise in film
                  production, from pre- to post-production roles.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-black/5 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/5 to-transparent" />
      </section>
    );
  }
);

Resume.displayName = "Resume";
