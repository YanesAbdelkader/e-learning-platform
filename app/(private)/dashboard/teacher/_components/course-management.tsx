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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "../_actions/CoursesAction";

export function CourseManagement({
  initialCourses,
}: {
  initialCourses: Course[];
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="tilte"
                //   value={newCourse.title}
                //   onChange={(e) =>
                //     setNewCourse({ ...newCourse, title: e.target.value })
                //   }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                //   value={newCourse.description}
                //   onChange={(e) =>
                //     setNewCourse({ ...newCourse, description: e.target.value })
                //   }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button
            //  onClick={addCourse}
            >Add Course</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Level</TableHead>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Course</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="edit-title"
                          //   value={editingCourse?.title}
                          //   onChange={(e) =>
                          //     setEditingCourse(
                          //       editingCourse
                          //         ? { ...editingCourse, title: e.target.value }
                          //         : null
                          //     )
                          //   }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="edit-description"
                          className="text-right"
                        >
                          Description
                        </Label>
                        <Textarea
                          id="edit-description"
                          //   value={editingCourse?.description}
                          //   onChange={(e) =>
                          //     setEditingCourse(
                          //       editingCourse
                          //         ? {
                          //             ...editingCourse,
                          //             description: e.target.value,
                          //           }
                          //         : null
                          //     )
                          //   }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button
                    // onClick={updateCourse()}
                    >
                      Update Course
                    </Button>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  //   onClick={() => deleteCourse(course.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
