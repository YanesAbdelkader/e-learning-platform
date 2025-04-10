"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Teacher } from "../_lib/shema";

export default function Teachers({ teachers }: { teachers: Teacher[] }) {
  const [hoveredTeacher, setHoveredTeacher] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {teachers.map((teacher) => (
        <Card
          key={teacher.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400 h-full flex flex-col"
          onMouseEnter={() => setHoveredTeacher(teacher.id)}
          onMouseLeave={() => setHoveredTeacher(null)}
        >
          {/* Fixed-size image container */}
          <div className="w-full h-[400px] relative overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${teacher.picture}`}
              alt={teacher.name}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
            {hoveredTeacher === teacher.id && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Link href={`/teachers/${teacher.id}`}>
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

          {/* Card content with fixed spacing */}
          <div className="p-4 flex flex-col flex-1">
            <CardHeader className="p-0 pb-3">
              <h3 className="font-bold text-lg line-clamp-1">{`${teacher.name} ${teacher.lastname}`}</h3>
              <p className="text-sm text-purple-600 font-medium line-clamp-1">
                {teacher.teacher_info.education}
              </p>
            </CardHeader>

            <CardContent className="p-0 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">
                    {teacher.teacher_info.rating?.toFixed(1) || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {teacher.students || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {teacher.course_count} Courses
                  </span>
                </div>
              </div>

              {/* Fixed height description */}
              <div className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3 h-[60px]">
                  {teacher.teacher_info.bio}
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
