"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface Course {
  id: string;
  title: string;
  rating: number;
  students: number;
  price: number;
  image?: string;
}

interface RelatedCoursesProps {
  courses: Course[];
}

export function CourseSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-6 w-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-10" />
          <div className="flex gap-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-full" />
              ))}
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function RelatedCourses({ courses }: RelatedCoursesProps) {
  const [isLoading, setIsLoading] = useState(true);
  new Promise(() => setTimeout(() => setIsLoading(false), 3000));

  if (!isLoading && (!courses || courses.length === 0)) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-2">No Related Courses Found</h2>
        <p className="text-gray-500">
          We couldn&apos;t find any courses related to this one.
        </p>
        <Link href="/courses">
          <Button className="mt-4" variant="outline">
            Browse All Courses
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, i) => <CourseSkeleton key={i} />)
          : courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative ">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.image}`}
                    alt={course.title}
                    width={500}
                    height={30}
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                  <div className="flex items-center mb-2">
                    <span className="font-medium mr-1">{course.rating}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarFilledIcon
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(course.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({course.students})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{course.price} DA</span>
                    <Link href={`/courses/${course.id}`}>
                      <Button
                        className="px-5 py-2 rounded-md hover:bg-indigo-600 hover:text-white"
                        variant="secondary"
                      >
                        View Course
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </>
  );
}