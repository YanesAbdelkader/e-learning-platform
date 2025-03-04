"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

const skills = [
  "All Categories",
  "Development",
  "Business",
  "IT & Software",
  "Design",
  "Marketing",
  "Personal Development",
  "Photography",
];

export default function SkillsSection() {
  const [selected, setSelected] = useState("All Categories");

  return (
    <div className="border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2 md:gap-3 overflow-x-auto scrollbar-hide snap-x md:justify-center">
          {skills.map((skill) => (
            <Toggle
              key={skill}
              pressed={selected === skill}
              onPressedChange={() => setSelected(skill)}
              aria-pressed={selected === skill}
              className={`px-4 py-2 rounded-lg text-sm font-medium snap-start transition-all whitespace-nowrap
                ${selected === skill 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"}
              `}
            >
              {skill}
            </Toggle>
          ))}
        </div>
      </div>
    </div>
  );
}
