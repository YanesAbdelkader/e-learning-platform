"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Teacher } from "../_lib/shemaTecher";
import { fetchTeachers } from "../_actions/teacherActions";
import TeacherDialog from "./techer-managment/TeacherDialog";

export default function TeacherManagment() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchTeachers();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading data:", error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Teacher Management</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Lastname</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.lastname}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.teacher_info?.subjects?.join(", ") || "N/A"}</TableCell>
                <TableCell>{teacher.teacher_info?.education || "N/A"}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      teacher.teacher_info?.verified ? "default" : "destructive"
                    }
                  >
                    {teacher.teacher_info?.verified ? "Verified" : "Not Verified"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-evenly">
                  <TeacherDialog teacherId={String(teacher.id)} refreshTeachers={loadData} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
