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
import { useToast } from "@/hooks/use-toast";

export function CourseManagement({
  initialCourses,
  categories,
}: {
  initialCourses: Course[];
  categories: Category[];
}) {
  const [courses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <AddCourse categories={categories} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="text-left w-[200px]">Title</TableHead>
              <TableHead className="text-left w-[300px]">Description</TableHead>
              <TableHead className="text-left w-[120px]">Level</TableHead>
              <TableHead className="text-left w-[180px]">Category</TableHead>
              <TableHead className="text-left w-[120px]">Price</TableHead>
              <TableHead className="text-left w-[100px]">Duration</TableHead>
              <TableHead className="text-left w-[150px]">Image</TableHead>
              <TableHead className="text-center w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id} className="border-b">
                <TableCell className="p-4">{course.title}</TableCell>
                <TableCell className="p-4 truncate max-w-[300px]">
                  {course.description}
                </TableCell>
                <TableCell className="p-4">{course.level}</TableCell>
                <TableCell className="p-4">
                  {categories.find(
                    (category) => category.id === course.category_id
                  )?.name || "Unknown"}
                </TableCell>
                <TableCell className="p-4">{course.price}</TableCell>
                <TableCell className="p-4">{course.duration}</TableCell>
                <TableCell className="p-4">
                  <div className="w-[120px] h-[80px] relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.image}`}
                      alt="Course Preview"
                      className="border shadow-md object-cover rounded-md"
                      fill
                    />
                  </div>
                </TableCell>
                <TableCell className="p-4 text-center">
                  <div className="flex gap-2 items-center justify-center">
                    {/* New Button (Customize the onClick function) */}
                    <Button
                      variant="outline"
                      onClick={() => console.log("New Button Clicked!")}
                    >
                      Episodes
                    </Button>
                    {/* Update Course Button */}
                    <UpdateCourse course={course} categories={categories} />

                    {/* Delete Course Button */}
                    <Button
                      variant="destructive"
                      className="px-3"
                      onClick={async () => {
                        const result = await deleteCourse(String(course.id));
                        if (result?.success) {
                          toast({
                            title: "Course Deleted",
                            description: result.message,
                          });
                          window.location.reload();
                        } else {
                          toast({
                            title: "Error",
                            description: result?.error,
                            variant: "destructive",
                          });
                        }
                      }}
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
    </div>
  );
}
