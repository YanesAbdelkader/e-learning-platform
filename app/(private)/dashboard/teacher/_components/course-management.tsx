"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Course, deleteCourse } from "../_actions/CoursesAction";
import AddCourse from "./course/Add";
import { Category } from "../_lib/schemaCourse";
import UpdateCourse from "./course/Update";
import Image from "next/image";

export function CourseManagement({
  initialCourses,
  categories,
}: {
  initialCourses: Course[];
  categories: Category[];
}) {
  const [courses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <form>
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </form>
        <AddCourse categories={categories} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>{course.price}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>{course.level}</TableCell>
              <TableCell>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.image}`}
                  alt="Preview"
                  className="max-w-full h-auto"
                  width={150}
                  height={150}
                />
              </TableCell>
              <TableCell>
                <div className="flex justify-evenly items-center">
                  <UpdateCourse course={course} categories={categories} />
                  <Button
                    variant="destructive"
                      onClick={async () => await deleteCourse(String(course.id))}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
