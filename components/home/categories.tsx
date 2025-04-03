"use client";

import { useState, useRef, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/data/getData";
import { Category } from "@/data/types";

type CategoriesProps = {
  onSelectCategory: (category: string) => void;
  defaultSelected?: string;
};

export default function Categories({
  onSelectCategory,
  defaultSelected = "All Categories",
}: CategoriesProps) {
  const [selected, setSelected] = useState(defaultSelected);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCategories();
      if (result.length === 0) {
        setError("No categories found. Please refresh to try again.");
      } else {
        setCategories([{ id: 0, name: "All Categories" }, ...result]);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("Failed to fetch categories. Please refresh to try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelect = (category: string) => {
    setSelected(category);
    onSelectCategory(category);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.5;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="border-b bg-white dark:bg-gray-950 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 relative group">
        <div className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-md bg-white dark:bg-gray-800"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-md bg-white dark:bg-gray-800"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-3 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
          role="tablist"
          aria-label="Categories"
        >
          {loading ? (
            <div className="flex justify-center items-center py-20 w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-2 py-20 w-full">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {error}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-20 w-full">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                No categories available.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          ) : (
            categories.map((category) => (
              <Toggle
                key={category.id}
                pressed={selected === category.name}
                onPressedChange={(pressed) => {
                  if (pressed) {
                    handleSelect(category.name);
                  }
                }}
                aria-pressed={selected === category.name}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                  ${
                    selected === category.name
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }
                `}
                style={{ minWidth: "fit-content" }}
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
