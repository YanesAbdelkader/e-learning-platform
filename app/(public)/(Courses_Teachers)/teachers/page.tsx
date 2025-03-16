"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Category, SearchType, Teacher } from "../_lib/shema";
import { getCategories, getTeachers } from "../_actions/data";
import FilterC from "../_components/filter";
import Teachers from "../_components/Teachers";

export default function TeachersPage() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<SearchType>("Teachers");
  const [rating, setRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teachersData, categoriesData] = await Promise.all([
          getTeachers(),
          getCategories(),
        ]);
        setTeachers(teachersData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(
      (teacher) =>
        teacher.teacher_info.rating >= rating
    );
  }, [teachers, rating]);

  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    if (type === "Courses") {
      router.push("/courses");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Meet Our Teachers</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Learn from industry experts and experienced educators
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <FilterC
            categories={categories}
            searchType={searchType}
            setSearchType={handleSearchTypeChange}
            rating={rating}
            setRating={setRating}
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            price={0}
            setPrice={() => {}}
            selectedCategory={""}
            setSelectedCategory={() => {}}
            selectedLevel={""}
            setSelectedLevel={() => {}}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {filteredTeachers.length > 0 ? (
            <Teachers teachers={filteredTeachers} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">
                No teachers match your filters
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