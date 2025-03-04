"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen } from "lucide-react";
import { Category, Course, SearchType } from "../_lib/shema";
import { getCategories, getCourses } from "../_actions/data";
import FilterC from "../_components/filter";
import Paginate from "../_components/paginate";

export default function CoursesPage() {
  const [searchType, setSearchType] = useState<SearchType>("Courses");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(100);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [coursesData, categoriesData] = await Promise.all([
          getCourses(rating, price),
          getCategories(),
        ]);
        setCourses(coursesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rating, price]);

  // Handle search type change
  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    if (type === "Teachers") {
      // Navigate to teachers page
      window.location.href = "/teachers";
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
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      course.image || "/placeholder.svg?height=200&width=300"
                    }
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">
                    {course.level}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <span className="font-bold text-primary">
                      ${course.price}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Badge variant="outline" className="mr-2">
                      {categories.find((c) => c.id === course.category_id)
                        ?.name || "Uncategorized"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {course.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration} hours</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1 text-primary" />
                    <span className="text-sm">Enroll Now</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {courses.length === 0 && (
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
      <Paginate
        page={0}
        totalPages={0}
        handlePageChange={function (newPage: number): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
