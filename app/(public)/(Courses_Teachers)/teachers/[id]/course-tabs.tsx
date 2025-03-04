"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CourseReviews from "../../courses/[Id]/_components/course-reviews";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CourseCurriculumProps {
  curriculum: string[];
  skills: string[];
}

function CourseCurriculum({ curriculum, skills }: CourseCurriculumProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
      <ul className="space-y-3">
        {curriculum.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">Skills You&apos;ll Gain</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>
    </>
  );
}

interface CourseInstructorProps {
  instructor: {
    id?:string;
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
        <AvatarImage src={instructor.avatar} alt={instructor.name} />
        <AvatarFallback>
          {instructor.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{instructor.name}</h3>
          <Link href={"/teachers/1"}>
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
    id?:string;
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  courseId: string;
}

export default function CourseTabs({
  curriculum,
  skills,
  instructor,
  courseId,
}: CourseTabsProps) {
  return (
    <Tabs defaultValue="curriculum" className="mt-8">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="instructor">Instructor</TabsTrigger>
      </TabsList>

      <TabsContent value="curriculum" className="mt-4">
        <CourseCurriculum curriculum={curriculum} skills={skills} />
      </TabsContent>

      <TabsContent value="reviews" className="mt-4">
        <CourseReviews courseId={courseId} />
      </TabsContent>

      <TabsContent value="instructor" className="mt-4">
        <CourseInstructor instructor={instructor} />
      </TabsContent>
    </Tabs>
  );
}
