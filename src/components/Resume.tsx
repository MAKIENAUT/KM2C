import { motion, useScroll, useTransform } from "framer-motion";
import { forwardRef, useRef, useEffect } from "react";
import { Mail, Phone, Languages, Camera, Film, Edit } from "lucide-react";
import Image from "next/image";

interface ResumeProps {
  intersectionRatio: number;
}

const experienceData = [
  {
    title: "DISKARTE",
    role: "Director, Writer, Producer, Editor",
    type: "Documentary",
    year: "2024",
    description:
      "Through an exploration of migration&apos;s history, Kirsten goes through a journey around Europe to understand the profound experience of being separated from one&apos;s homeland and the search for a new sense of belonging.",
  },
  {
    title: "THE ANGELS TRUMPET",
    role: "Colorist",
    type: "Shadow Puppetry",
    year: "2024",
    description:
      "Served as colorist for the film &apos;The Angels of Trumpet&apos;, applying shadow puppetry and animation techniques that resulted in a visually striking black-and-white film.",
  },
  {
    title: "GOD GOT US",
    role: "Research, Cinematographer, Editor",
    type: "Documentary",
    year: "2023",
    description:
      "Served as a fellow researcher, cinematographer and editor in the 14 minute film, exploring self identity in art and the importance within black ideology.",
  },
];

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
          className={`scrollbar-hide h-full overflow-y-scroll transition-opacity duration-300 ${
            intersectionRatio < 0.99
              ? "pointer-events-none opacity-50"
              : "opacity-100"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 py-16">
            {/* Header Section with Profile */}
            <motion.div
              style={{ y: profileY }}
              className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12"
            >
              {/* Profile Picture */}
              <div className="relative md:col-span-4 md:col-start-2">
                <div className="aspect-square overflow-hidden rounded-xl bg-white p-2 shadow-lg">
                  <div className="h-full w-full rounded-2xl bg-gray-100">
                    <Image
                      src="/frontporch.jpg"
                      alt="Profile"
                      width={400}
                      height={400}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-orange-100 opacity-50" />
                <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-blue-100 opacity-50" />
              </div>

              {/* Name and Contact */}
              <div className="flex flex-col justify-center md:col-span-6">
                <h2 className="mb-6 text-5xl font-bold text-gray-900 md:text-7xl">
                  KIRSTEN CERALDE
                </h2>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="text-orange-500" size={18} />
                    <span>Kmmceralde@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="text-orange-500" size={18} />
                    <span>US +1(312-394-9188) | FR +33(0625059385)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="text-orange-500" size={18} />
                    <span>English, Tagalog</span>
                  </div>
                </div>
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
