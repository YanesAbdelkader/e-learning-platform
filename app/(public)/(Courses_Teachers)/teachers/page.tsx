"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category, SearchType, Teacher } from "../_lib/shema";
import { getCategories, getTeachers } from "../_actions/data";
import FilterC from "../_components/filter";
import Paginate from "../_components/paginate";

export default function TeachersPage() {
  const [searchType, setSearchType] = useState<SearchType>("Teachers");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(100); // Not directly used for teachers but kept for filter component
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teachersData, categoriesData] = await Promise.all([
          getTeachers(rating),
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
  }, [rating]);

  // Handle search type change
  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    if (type === "Courses") {
      // Navigate to courses page
      window.location.href = "/courses";
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
          {/* Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <Card
                key={teacher.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="flex flex-col items-center text-center pb-2">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img
                      src={
                        teacher.picture ||
                        "/placeholder.svg?height=200&width=200"
                      }
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{teacher.name}</h3>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(teacher.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm">
                      {teacher.rating.toFixed(1)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="mr-1 mb-1"
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {teacher.bio}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{teacher.email}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {teacher.subjects.length} Courses
                    </span>
                  </div>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {teachers.length === 0 && (
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
      <Paginate
        page={0}
        totalPages={0}
        handlePageChange={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
