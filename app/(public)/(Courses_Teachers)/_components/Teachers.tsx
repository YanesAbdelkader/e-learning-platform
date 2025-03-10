"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Star } from "lucide-react";
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
          className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400 h-85"
          onMouseEnter={() => setHoveredTeacher(teacher.id)}
          onMouseLeave={() => setHoveredTeacher(null)}
        >
          {/* Image Section */}
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={teacher.picture || "/placeholder.svg"}
              alt={teacher.name}
              width={400}
              height={400}
              className="object-cover transition-transform duration-300 hover:scale-110 w-full h-full"
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

          {/* Header Section */}
          <CardHeader className="space-y-1">
            <h3 className="font-bold text-lg">{teacher.name}</h3>
            <p className="text-sm text-purple-600 font-medium">
              {teacher.subjects.join(", ")}
            </p>
          </CardHeader>

          {/* Content Section */}
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{teacher.rating.toFixed(1)}</span>
              </div>

              {/* Students */}
              {/* <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {teacher.students?.toLocaleString() || "N/A"}
                </span>
              </div> */}

              {/* Courses */}
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {teacher.certifications.length} Courses
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-3">
              {teacher.bio}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
