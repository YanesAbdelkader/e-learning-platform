"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, BookOpen } from "lucide-react";
import img from "../app/assets/image.jpg";
const teachers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    expertise: "Data Science & Machine Learning",
    rating: 4.9,
    students: 45892,
    courses: 12,
    image: img,
    description:
      "Former Google AI researcher with PhD in Computer Science. Specializes in making complex concepts accessible to all.",
    achievements: ["Top Instructor 2024", 'Author of "AI for Everyone"'],
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    expertise: "Web Development",
    rating: 4.8,
    students: 38567,
    courses: 15,
    image: img,
    description:
      "Full-stack developer with 15 years of industry experience. Known for practical, project-based teaching approach.",
    achievements: ["5 Million Students Taught", "Creator of WebDev Bootcamp"],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    expertise: "UX/UI Design",
    rating: 4.9,
    students: 32145,
    courses: 8,
    image: img,
    description:
      "Award-winning designer who has worked with top Silicon Valley companies. Passionate about teaching design principles.",
    achievements: ["Adobe Certified Expert", "UX Design Award Winner"],
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    expertise: "Business Strategy",
    rating: 4.7,
    students: 28934,
    courses: 10,
    image: img,
    description:
      "Harvard MBA and consultant for Fortune 500 companies. Brings real-world case studies to every lesson.",
    achievements: ["Best-selling Business Author", "TEDx Speaker"],
  },
];

export default function BestTeachers() {
  const [hoveredTeacher, setHoveredTeacher] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {teachers.map((teacher) => (
        <Card
          key={teacher.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg border-none h-85"
          onMouseEnter={() => setHoveredTeacher(teacher.id)}
          onMouseLeave={() => setHoveredTeacher(null)}
        >
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={teacher.image}
              alt={teacher.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
            {hoveredTeacher === teacher.id && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Button
                  variant="secondary"
                  className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  View Profile
                </Button>
              </div>
            )}
          </div>
          <CardHeader className="space-y-1">
            <h3 className="font-bold text-lg">{teacher.name}</h3>
            <p className="text-sm text-purple-600 font-medium">
              {teacher.expertise}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{teacher.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {teacher.students.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {teacher.courses}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {teacher.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
