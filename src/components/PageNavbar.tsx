"use client";

import Image from "next/image";
import { Button } from "./atoms/button";
import Link from "next/link";
import { useState } from "react";
import { vt323 } from "@/lib/fonts";
import { LINK_VALUES } from "@/lib/values";
import MenuList from "./molecules/MenuList";

export default function PageNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={`${isMenuOpen ? "" : "bg-black"} sticky top-0 z-50 text-white`}
      >
        <section
          className={`${isMenuOpen ? "justify-end" : "justify-between"} mx-auto flex h-20 max-w-7xl items-center px-4 text-white`}
        >
          <Link href="/" className={isMenuOpen ? "hidden" : ""}>
            <Image
              alt="Navbar icon"
              src="/km2c-logo.svg"
              width={0}
              height={0}
              className={`w-16`}
            />
          </Link>
          <Button
            variant="menu"
            size="menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Image
              alt="Navbar icon"
              src={isMenuOpen ? "/close-icon.svg" : "/icon-menu.svg"}
              width={0}
              height={0}
              className={`size-10`}
            />
          </Button>
        </section>
      </nav>
      <section
        className={`${isMenuOpen ? "" : "hidden"} ${vt323.className} fixed top-0 z-40 min-h-screen w-screen bg-barn-red p-16`}
      >
        <div
          className={`mb-12 flex items-center justify-center gap-8 text-8xl text-white`}
        >
          <Image
            src="/menu-dashed-line.svg"
            alt="Menu dashed line"
            width={0}
            height={0}
            className="w-1/6"
          />
          <h1>MENU</h1>
          <Image
            src="/menu-dashed-line.svg"
            alt="Menu dashed line"
            width={0}
            height={0}
            className="w-1/6"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-4">
            {LINK_VALUES.map((linkProps) => (
              <MenuList
                key={linkProps.link}
                {...linkProps}
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// MAKIE'S DRAFT

// import { motion } from "framer-motion";

// interface NavbarProps {
//   variant?: "light" | "dark";
//   className?: string;
// }

// export const Navbar = ({ variant = "light", className = "" }: NavbarProps) => {
//   const logoFilter = variant === "light" ? "brightness(0) invert(1)" : "none";
//   const bgColor = variant === "light" ? "bg-transparent" : "bg-white";

//   return (
//     <motion.nav
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className={`fixed left-0 right-0 top-0 z-50 ${bgColor} ${className}`}
//     >
//       <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
//         <img
//           src="/km2c-logo.svg"
//           alt="KM2C Logo"
//           className="h-12 w-auto transition-all duration-300"
//           style={{ filter: logoFilter }}
//         />
//         {/* Add your navigation links here */}
//         <div className="hidden space-x-8 md:flex">
//           <NavLink href="/about" variant={variant}>About</NavLink>
//           <NavLink href="/projects" variant={variant}>Projects</NavLink>
//           <NavLink href="/contact" variant={variant}>Contact</NavLink>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };

// interface NavLinkProps {
//   href: string;
//   children: React.ReactNode;
//   variant: "light" | "dark";
// }

// const NavLink = ({ href, children, variant }: NavLinkProps) => {
//   const textColor = variant === "light" ? "text-white" : "text-black";
//   const hoverColor = variant === "light" ? "hover:text-white/80" : "hover:text-black/80";

//   return (
//     <a
//       href={href}
//       className={`${textColor} ${hoverColor} transition-colors duration-200`}
//     >
//       {children}
//     </a>
//   );
// };
