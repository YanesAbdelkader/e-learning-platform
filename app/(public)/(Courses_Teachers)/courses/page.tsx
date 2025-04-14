"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category, Course, SearchType } from "../_lib/shema";
import { getCategories, getCourses } from "../_actions/data";
import FilterC from "../_components/filter";
import Courses from "../_components/Courses";

export default function CoursesPage() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<SearchType>("Courses");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(10000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [coursesData, categoriesData] = await Promise.all([
          getCourses(),
          getCategories(),
        ]);
        setCourses(coursesData);
        setCategories([{ id: "all", name: "All Categories", description: "" }, ...categoriesData]);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.price <= price &&
    course.rating >= rating &&
    (selectedCategory === "all" || course.category.id.toString() === selectedCategory) &&
    (selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase())
  );

  const handleSearchTypeChange = (type: SearchType) => {
    if (type === "Teachers") {
      router.push("/teachers");
    } else {
      setSearchType(type);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Discover our wide range of courses to enhance your skills
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <FilterC
            categories={categories}
            searchType={searchType}
            setSearchType={handleSearchTypeChange}
            rating={rating}
            setRating={setRating}
            price={price}
            setPrice={setPrice}
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <Courses courses={filteredCourses} />
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">
                No courses match your filters
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filter criteria
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}