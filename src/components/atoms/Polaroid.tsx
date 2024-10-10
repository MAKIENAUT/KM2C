import { motion } from "framer-motion";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

const PolaroidVariants = cva("bg-white p-4 shadow-xl", {
  variants: {
    variant: {
      default: "absolute",
      about: "sticky top-[calc(var(--nav-height)+32px)] h-fit",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface PolaroidProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof PolaroidVariants> {
  image: string;
  caption: string;
  isBack?: boolean;
  className?: string;
  cursor?: string;
  color?: string;
}

const Polaroid = forwardRef<HTMLDivElement, PolaroidProps>(
  (
    { variant, image, caption, className = "", cursor = "", color = "" },
    ref
  ) => {
    return (
      <motion.section
        className={cn(
          `cursor-${cursor}`,
          PolaroidVariants({ variant, className })
        )}
        initial={false}
        ref={ref}
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
      </motion.section>
    );
  }
);
Polaroid.displayName = "Polaroid";

export default Polaroid;
