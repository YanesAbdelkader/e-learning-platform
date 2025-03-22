"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CourseReviews from "../../courses/[Id]/_components/course-reviews";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CourseInstructorProps {
  instructor: {
    id?: string;
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
}

function CourseInstructor({ instructor }: CourseInstructorProps) {
  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${instructor.avatar}`}
        />
      </Avatar>
      <div>
        <div className="w-full flex items-center justify-between">
          <h3 className="text-xl font-bold">{instructor.name}</h3>
          <Link href={`/teachers/${instructor.id}`} className="pl-4">
            <Button variant={"default"} className="text-sm">
              View Profile
            </Button>
          </Link>
        </div>
        <p className="text-gray-500">{instructor.role}</p>
        <p className="mt-2">{instructor.bio}</p>
      </div>
    </div>
  );
}

interface CourseTabsProps {
  curriculum: string[];
  skills: string[];
  instructor: {
    id?: string;
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  courseId: string;
}

export default function CourseTabs({ instructor, courseId }: CourseTabsProps) {
  return (
    <Tabs defaultValue="reviews" className="mt-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="instructor">Instructor</TabsTrigger>
      </TabsList>

      <TabsContent value="reviews" className="mt-4">
        <CourseReviews courseId={courseId} />
      </TabsContent>

      <TabsContent value="instructor" className="mt-4">
        <CourseInstructor instructor={instructor} />
      </TabsContent>
    </Tabs>
  );
}
