"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, BookOpen } from "lucide-react";
import Link from "next/link";
import { Teacher } from "@/data/types";
import { fetchTeachers } from "@/data/getData";

export default function BestTeachers() {
  const [hoveredTeacher, setHoveredTeacher] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const startTime = performance.now(); // Start timing API call
      try {
        const result = await fetchTeachers();
        setTeachers(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        console.log("API call took:", performance.now() - startTime, "ms");
      }
    };
    fetchData();
  }, []);

  // Limit to 12 teachers
  const limitedTeachers = teachers.slice(0, 12);

  return (
    <>
      <h2 className="text-4xl font-bold text-primary mb-6">
        Learn from the Best
      </h2>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {limitedTeachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400 h-85"
              onMouseEnter={() => setHoveredTeacher(teacher.id)}
              onMouseLeave={() => setHoveredTeacher(null)}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${teacher.picture}`}
                  alt={teacher.name}
                  width={400}
                  height={400}
                  className="object-cover transition-transform duration-300 hover:scale-110 w-full h-full"
                  priority={false} 
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
              <CardHeader className="space-y-1">
                <h3 className="font-bold text-lg">{`${teacher.name} ${teacher.lastname}`}</h3>
                <p className="text-sm text-purple-600 font-medium">
                  {teacher.teacher_info.education}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">
                      {teacher.teacher_info.rating || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
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
          ))}
        </div>
      )}
    </>
  );
}
