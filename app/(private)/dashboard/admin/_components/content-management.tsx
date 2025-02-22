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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Course } from "../_lib/shemaCourse";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function ContentManagement({
  initialCourses,
}: {
  initialCourses: Course[];
}) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [unpublishReason, setUnpublishReason] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUnpublishCourse = () => {
    if (selectedCourseId && unpublishReason) {
      setCourses(
        courses.map((course) =>
          course.id === selectedCourseId
            ? { ...course, status: "Unpublished", unpublishReason }
            : course
        )
      );
      setUnpublishReason("");
      setSelectedCourseId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Courses and Content Management
      </h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search courses or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Tabs defaultValue="courses">
        <TabsContent value="courses">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.teacher}</TableCell>
                  <TableCell>{course.enrollments}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        course.status === "Published" ? "default" : "secondary"
                      }
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {course.status === "Published" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setSelectedCourseId(course.id)}
                          >
                            Unpublish
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Unpublish Course</DialogTitle>
                            <DialogDescription>
                              Please provide a reason for unpublishing this
                              course.
                            </DialogDescription>
                          </DialogHeader>
                          <Textarea
                            placeholder="Enter reason for unpublishing..."
                            value={unpublishReason}
                            onChange={(e) => setUnpublishReason(e.target.value)}
                          />
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setUnpublishReason("")}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleUnpublishCourse}
                            >
                              Unpublish
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                    {course.status === "Unpublished" && (
                      <div className="text-sm text-muted-foreground">
                        Reason: {course.unpublishReason}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
