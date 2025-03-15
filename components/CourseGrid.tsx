import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Course } from "@/data/types";
import { fetchCourses } from "@/data/getData";

type CourseGridProps = {
  selectedCategory: string;
};

export default function CourseGrid({ selectedCategory }: CourseGridProps) {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resulte = await fetchCourses();
        setCourses(resulte);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCourses =
    selectedCategory === "All Categories"
      ? courses
      : courses.filter((course) => course.category.name === selectedCategory);
  const displayedCourses = filteredCourses.slice(0, 12);

  return (
    <div className="py-2 bg-gradient-to-b from-muted to-background text-foreground">
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-left mb-10">Featured Courses</h2>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedCourses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden flex flex-col h-[450px] transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:border-indigo-400 dark:hover:shadow-gray-500 rounded-lg"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.image}`}
                    alt={course.title}
                    width={400}
                    height={300}
                    priority={false} 
                    className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
                  />
                  {course.category && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold">
                      {course.category.name}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex-grow">
                    {`${course.instructor.name} ${course.instructor.lastname}`}
                  </p>
                  <div className="flex items-center mb-3">
                    <span className="font-semibold text-lg mr-2">
                      {course.rating}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(course.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-xl">{course.price} DA</span>
                    <Link href={`/courses/${course.id}`}>
                      <Button
                        variant="outline"
                        className="px-5 py-2 rounded-md hover:bg-indigo-600 hover:text-white"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center">
            No courses available in this category.
          </p>
        )}
      </div>
    </div>
  );
}
