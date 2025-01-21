"use client";

import { useState } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { courses, Course } from "@/data/courses";

export default function Courses() {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  const categories = Array.from(
    new Set(courses.map((course) => course.category))
  );
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    filterCourses(value, selectedCategories, selectedLevels, minRating);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);
    setSelectedCategories(updatedCategories);
    filterCourses(priceRange, updatedCategories, selectedLevels, minRating);
  };

  const handleLevelChange = (level: string, checked: boolean) => {
    const updatedLevels = checked
      ? [...selectedLevels, level]
      : selectedLevels.filter((l) => l !== level);
    setSelectedLevels(updatedLevels);
    filterCourses(priceRange, selectedCategories, updatedLevels, minRating);
  };

  const handleRatingChange = (value: number[]) => {
    setMinRating(value[0]);
    filterCourses(priceRange, selectedCategories, selectedLevels, value[0]);
  };

  const filterCourses = (
    price: number[],
    categories: string[],
    levels: string[],
    rating: number
  ) => {
    const filtered = courses.filter(
      (course) =>
        course.price >= price[0] &&
        course.price <= price[1] &&
        (categories.length === 0 || categories.includes(course.category)) &&
        (levels.length === 0 || levels.includes(course.level)) &&
        course.rating >= rating
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Course Catalog</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Price Range</h2>
            <Slider
              min={0}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={handlePriceChange}
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={category}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Level</h2>
            {levels.map((level) => (
              <div key={level} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={level}
                  onCheckedChange={(checked) =>
                    handleLevelChange(level, checked as boolean)
                  }
                />
                <Label htmlFor={level}>{level}</Label>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Minimum Rating</h2>
            <Slider
              min={0}
              max={5}
              step={0.1}
              value={[minRating]}
              onValueChange={handleRatingChange}
            />
            <div className="flex items-center mt-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-2">{minRating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative h-48">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">
                      ${course.price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{course.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    <span className="mr-2">{course.category}</span>
                    <span>{course.level}</span>
                  </div>
                  <Button className="w-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    See Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
