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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Course } from "../_lib/shemaCourse";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateCourseStatus } from "../_actions/ContentActions";
import { toast } from "@/hooks/use-toast";

export default function ContentManagement({
  initialCourses,
}: {
  initialCourses: Course[];
}) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Published" | "Unpublished"
  >("All");
  const [loadingId, setLoadingId] = useState<number | null>(null); 

  const filteredCourses = courses.filter((course) => {
    const matchesSearchTerm =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || course.status === filterStatus;

    return matchesSearchTerm && matchesStatus;
  });

  // Handle course status change
  const handleStatusChange = async (id: number, newStatus: boolean) => {
    setLoadingId(id);
    try {
      const result = await updateCourseStatus(String(id), newStatus);
      if (result?.success) {
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === id
              ? { ...course, status: newStatus ? "Published" : "Unpublished" }
              : course
          )
        );
        toast({
          title: "Status updated",
          description: result.message,
        });
      } else {
        toast({
          title: "Error",
          description: result?.error || "Failed to update course status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("Failed to update course status:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoadingId(null); 
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Content Management</h1>
      <div className="flex items-center gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search courses or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={filterStatus}
          onValueChange={(value) =>
            setFilterStatus(value as "All" | "Published" | "Unpublished")
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Unpublished">Unpublished</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tabs defaultValue="courses">
        <TabsContent value="courses">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.teacher}</TableCell>
                  <TableCell>{course.price} DA</TableCell>
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
                    <Button
                      variant={
                        course.status === "Published"
                          ? "destructive"
                          : "default"
                      }
                      size="sm"
                      onClick={() =>
                        handleStatusChange(
                          course.id,
                          course.status === "Published" ? false : true
                        )
                      }
                      disabled={loadingId === course.id} // Disable button while loading
                    >
                      {loadingId === course.id ? (
                        "Loading..."
                      ) : course.status === "Published" ? (
                        "Unpublish"
                      ) : (
                        "Publish"
                      )}
                    </Button>
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