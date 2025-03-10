"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Category } from "@/data/types";



type CategoriesProps = {
  categories: Category[];
  onSelectCategory: (category: string) => void;
};

export default function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selected, setSelected] = useState("All Categories");

  const handleSelect = (category: string) => {
    setSelected(category);
    onSelectCategory(category);
  };

  return (
    <div className="border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2 md:gap-3 overflow-x-auto scrollbar-hide snap-x md:justify-center">
          {categories.map((category) => (
            <Toggle
              key={category.id}
              pressed={selected === category.name}
              onPressedChange={() => handleSelect(category.name)}
              aria-pressed={selected === category.name}
              className={`px-4 py-2 rounded-lg text-sm font-medium snap-start transition-all whitespace-nowrap
                ${
                  selected === category.name
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }
              `}
            >
              {category.name}
            </Toggle>
          ))}
        </div>
      </div>
    </div>
  );
}
