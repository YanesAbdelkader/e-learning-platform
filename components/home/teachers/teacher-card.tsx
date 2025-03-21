"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, BookOpen, Users } from "lucide-react";
import type { Teacher } from "@/data/types";

interface TeacherCardProps {
  teacher: Teacher;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getImageUrl = (filename: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${filename}`;
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400 h-85"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={getImageUrl(teacher.picture)}
          alt={`${teacher.name} ${teacher.lastname}`}
          width={400}
          height={400}
          className="object-cover transition-transform duration-300 hover:scale-105 w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {isHovered && (
          <div
            className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300"
            aria-hidden="true"
          >
            <Link
              href={`/teachers/${teacher.id}`}
              aria-label={`View ${teacher.name}'s profile`}
            >
              <Button
                variant="secondary"
                className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                View Profile
              </Button>
            </Link>
          </div>
        )}
      </div>
      <CardHeader className="space-y-1">
        <h3 className="font-bold text-lg">{`${teacher.name} ${teacher.lastname}`}</h3>
        <p className="text-sm text-primary font-medium">
          {teacher.teacher_info.education}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-1"
            aria-label={`Rating: ${teacher.teacher_info.rating || "Not rated"}`}
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">
              {teacher.teacher_info.rating || "N/A"}
            </span>
          </div>
          <div
            className="flex items-center gap-1"
            aria-label={`${teacher.students || 0} students`}
          >
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {teacher.students ? teacher.students : "0"}
            </span>
          </div>
          <div
            className="flex items-center gap-1"
            aria-label={`${teacher.course_count || 0} courses`}
          >
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {teacher.course_count}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {teacher.teacher_info.bio}
        </p>
      </CardContent>
    </Card>
  );
}
