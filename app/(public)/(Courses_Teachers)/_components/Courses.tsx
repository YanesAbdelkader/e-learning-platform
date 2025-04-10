import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock4 } from "lucide-react";
import Link from "next/link";
import { Course } from "../_lib/shema";
import StarRating from "@/components/home/courses/star-rating";

type CoursesProps = {
  courses: Course[];
};

export default function Courses({ courses }: CoursesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-500/20 rounded-lg"
        >
          <div className="relative h-48 w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.image}`}
              alt={course.title}
              width={400}
              height={225}
              className="w-full h-full object-cover rounded-t-lg"
              priority={false}
            />
            {course.level && (
              <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
                {course.level}
              </Badge>
            )}
          </div>
          <CardContent className="p-5 flex flex-col flex-grow">
            <div className="space-y-3 flex-grow">
              <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {course.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock4 className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-semibold">{course.rating}</span>
                <StarRating rating={course.rating} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <span className="font-bold text-lg">{course.price}DA</span>
              <Link href={`/courses/${course.id}`} className="shrink-0">
                <Button
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  size="sm"
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