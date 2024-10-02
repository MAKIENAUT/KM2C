import { motion } from "framer-motion";
import { forwardRef } from "react";
import { ParallaxText } from "./ParallaxText";

interface ProjectsProps {
  intersectionRatio: number;
}

export const Projects = forwardRef<HTMLElement, ProjectsProps>(
  ({ intersectionRatio }, ref) => {
    return (
      <section
        ref={ref}
        className="relative min-h-screen overflow-hidden bg-cream px-4 py-32"
      >
        <div className="mx-auto max-w-7xl">
          <ParallaxText>
            <h2 className="mb-16 text-center text-5xl font-bold text-gray-900 md:text-7xl">
              Our Projects
            </h2>
          </ParallaxText>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: intersectionRatio > 0 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {["Project 1", "Project 2", "Project 3"].map((location, index) => (
              <motion.div
                key={location}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: intersectionRatio > 0 ? 1 : 0,
                  y: intersectionRatio > 0 ? 0 : 20,
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 bg-[url('/sexstore.jpg')] bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {location}
                    </h3>
                    <p className="text-sm text-white/80">
                      Discover more about {location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-black/5 to-transparent" />
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/5 to-transparent" />
      </section>
    );
  }
);

Projects.displayName = "Projects";
