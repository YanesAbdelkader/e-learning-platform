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
      className="w-[350px] h-[450px] flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Fixed Size */}
      <div className="w-full h-[300px] relative overflow-hidden">
        <Image
          src={getImageUrl(teacher.picture)}
          alt={`${teacher.name} ${teacher.lastname}`}
          width={300}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        {isHovered && (
          <div
            className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300"
            aria-hidden="true"
          >
            <Link
              href={`/teachers/${teacher.id}`}
              aria-label={`View ${teacher.name}'s profile`}
              passHref
              legacyBehavior
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

      {/* Content Container - Fixed Height */}
      <div className="flex-1 flex flex-col p-4">
        <CardHeader className="p-0 pb-2 space-y-1">
          <h3 className="font-bold text-lg line-clamp-1">{`${teacher.name} ${teacher.lastname}`}</h3>
          <p className="text-sm text-primary font-medium line-clamp-1">
            {teacher.teacher_info.education}
          </p>
        </CardHeader>
        
        <CardContent className="p-0 space-y-3 flex-1 flex flex-col">
          {/* Stats Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-sm">
                {teacher.teacher_info.rating?.toFixed(1) || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {teacher.students?.toLocaleString() || "0"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {teacher.course_count || "0"}
              </span>
            </div>
          </div>

          {/* Bio - Fixed Height */}
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
            {teacher.teacher_info.bio}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}