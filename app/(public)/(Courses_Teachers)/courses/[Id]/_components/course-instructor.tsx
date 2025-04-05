"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export interface Instructor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}
export default function CourseInstructor({
  instructor,
}: {
  instructor: Instructor;
}) {
  const [isLoading, setIsLoading] = useState(true);
  new Promise(() => setTimeout(() => setIsLoading(false), 500));
  if (isLoading || !instructor) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg">
        <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-9 w-28" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg">
      <Avatar className="h-16 w-16 flex-shrink-0">
        <AvatarImage
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${instructor.avatar}`}
          alt={`${instructor.name}'s profile picture`}
        />
        <AvatarFallback>
          {instructor.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {instructor.name}
            </h3>
            <p className="text-sm text-muted-foreground">{instructor.role}</p>
          </div>

          {instructor.id && (
            <Link
              href={`/teachers/${instructor.id}`}
              passHref
              className="w-full sm:w-auto"
            >
              <Button
                variant="default"
                size="sm"
                className="w-full sm:w-auto bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label={`View ${instructor.name}'s profile`}
              >
                View Profile
                <span className="sr-only"> of {instructor.name}</span>
              </Button>
            </Link>
          )}
        </div>

        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {instructor.bio}
        </p>
      </div>
    </div>
  );
}
