import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { Course } from "../_lib/shema";

type CoursesProps = {
  courses: Course[];
};

export default function Courses({ courses }: CoursesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="overflow-hidden flex flex-col h-[480px] transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:border-indigo-400 dark:hover:shadow-gray-500 rounded-lg"
        >
          <div className="relative h-56 w-full">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              width={400}
              height={300}
              className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            />
            {course.level && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold">
                {course.level}
              </Badge>
            )}
          </div>
          <CardContent className="p-6 flex flex-col h-full">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-3 flex-grow">
              {course.description}
            </p>
            <div className="flex flex-col items-start gap-2 mb-3">
              <span className="text-gray-500 text-lg mr-2">
                {course.duration} hours
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(4)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  (1000+ students)
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-bold text-xl">
                ${parseFloat(course.price).toFixed(2)}
              </span>
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
  );
}
