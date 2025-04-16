import React from "react";
import Image from "next/image";
import { getTechLogos } from "@/lib/utils";

interface TechIconProps {
  techstack: string[];
}

interface TechIcon {
  tech: string;
  url: string;
}

const DisplayTechIcons = async ({ techstack }: TechIconProps) => {
  try {
    const techIcons: TechIcon[] = await getTechLogos(techstack);

    return (
      <div className="flex flex-row gap-2">
        {techIcons.slice(0, 3).map(({ tech, url }, index) => (
          <div
            key={`${tech}-${index}`}
            className="relative group bg-dark-300 rounded-full p-2 flex items-center justify-center"
          >
            <Image
              src={url}
              alt={tech}
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            <span
              className={`
  tech-tooltip 
  absolute 
  bottom-full 
  mb-2 
  opacity-0 
  invisible 
  group-hover:opacity-100 
  group-hover:visible
  transition-all 
  duration-200 
  ease-out
  transform
  group-hover:-translate-y-1
  px-2 
  py-1
  text-xs 
  bg-gray-800 
  text-white 
  rounded
  shadow-md
  whitespace-nowrap
  pointer-events-none
`}
            >
              {tech}
            </span>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading tech icons:", error);
    return (
      <div className="flex flex-row gap-2">
        {techstack.slice(0, 3).map((tech, index) => (
          <div
            key={`${tech}-${index}`}
            className="bg-dark-300 rounded-full flex items-center justify-center"
          >
            <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }
};

export default DisplayTechIcons;
