"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface MenuItemProps {
  link: string;
  text: string;
  img: string;
  imgHover: string;
  onClick: () => void;
}

const MenuList = ({ link, text, img, imgHover, onClick }: MenuItemProps) => {
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
          src={isHovered ? imgHover : img}
          width={64}
          height={64}
          className="w-16 transition-all duration-300"
        />
        {text}
      </div>
    </Link>
  );
};

export default MenuList;
