"use client";

import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Category } from "@/data/types";
import { fetchCategories } from "@/data/getData";

type CategoriesProps = {
  onSelectCategory: (category: string) => void;
};

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const [selected, setSelected] = useState("All Categories");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchCategories();
        setCategories([{ id: 0, name: "All Categories" }, ...result]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (category: string) => {
    setSelected(category);
    onSelectCategory(category);
  };

  return (
    <div className="border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2 md:gap-3 overflow-x-auto scrollbar-hide snap-x md:justify-center">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            categories.map((category) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
