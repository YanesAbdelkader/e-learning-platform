"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Course } from "@/data/types";
import StarRating from "./star-rating";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400 h-85">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.image}`}
          alt={`${course.title} course thumbnail`}
          width={400}
          height={300}
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
        />
        {course.category && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold">
            {course.category.name}
          </Badge>
        )}
      </div>
      <CardContent className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {`${course.instructor.name} ${course.instructor.lastname}`}
        </p>
        <div className="flex items-center mb-3">
          <span className="font-semibold text-lg mr-2">{course.rating}</span>
          <StarRating rating={course.rating} />
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
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
  );
}
