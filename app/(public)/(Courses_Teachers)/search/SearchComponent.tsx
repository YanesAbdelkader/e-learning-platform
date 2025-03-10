"use client";

import { useState } from "react";
import CourseCard from "@/components/course-card";
import TeacherCard from "@/components/teacher-card";
import { Category, SearchResult, SearchType } from "../_lib/shema";
import FilterC from "../_components/filter";
import Paginate from "../_components/paginate";

export default function SearchComponent({
  result,
  categories,
}: {
  result: SearchResult;
  categories: Category[];
}) {
  const [searchType, setSearchType] = useState<SearchType>("Courses");
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<number>(100);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const totalPages = result.pages;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="space-y-2">
      <FilterC
        categories={categories}
        searchType={searchType}
        setSearchType={setSearchType}
        rating={rating}
        setRating={setRating}
        price={price}
        setPrice={setPrice}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {searchType === "Courses" ? (
        result.Courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {result.Courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No courses found.</p>
        )
      ) : searchType === "Teachers" ? (
        result.Teachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {result.Teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        ) : (
          <p className="text-center justify-center text-gray-500 h-[60vh]">
            No teachers found.
          </p>
        )
      ) : null}

      <Paginate
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
