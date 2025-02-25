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
    <div className="border-b bg-white dark:bg-gray-950 ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {skills.map((skill) => (
            <Toggle
              key={skill}
              pressed={selected === skill}
              onPressedChange={() => setSelected(skill)}
              className="whitespace-nowrap dark:hover:text-gray-100"
            >
              {skill}
            </Toggle>
          ))}
        </div>
      </div>
    </div>
  );
}
