import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Course } from "@/data/types";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type CourseCardProps = {
  course: Course;
  removeFromCart?: (id: string) => void;
};
export default function CourseCard({
  course,
  removeFromCart,
}: CourseCardProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.image}`}
              alt={course.title}
              width={400}
              height={200}
              className="w-full sm:w-32 h-auto rounded-md object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold text-lg">{course.title}</h3>
            <p className="text-sm text-muted-foreground">
              By {course.instructor.name} {course.instructor.lastname}
            </p>
          </div>
          <div className="flex flex-col items-end justify-between">
            <p className="text-lg font-bold">{course.price} DA</p>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() => removeFromCart?.(String(course.id))}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
