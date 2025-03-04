"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus, Star } from "lucide-react"
import { Course, Teacher } from "../_types/teacher"
import { getSimilarTeachers } from "../_actions/get-similar-teachers"
import { getRecommendedCourses } from "../_actions/get-recommended-courses"

interface TeacherSidebarProps {
  subjects: string[]
  teacherId: string
}

export default function TeacherSidebar({ subjects, teacherId }: TeacherSidebarProps) {
  const [similarTeachers, setSimilarTeachers] = useState<Teacher[]>([])
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSidebarData = async () => {
      setIsLoading(true)
      try {
        const [teachersData, coursesData] = await Promise.all([
          getSimilarTeachers(teacherId),
          getRecommendedCourses(teacherId),
        ])

        setSimilarTeachers(teachersData)
        setRecommendedCourses(coursesData)
      } catch (error) {
        console.error("Failed to load sidebar data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSidebarData()
  }, [teacherId])

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Subjects</h3>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject, index) => (
              <Badge key={index} variant="secondary">
                {subject}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Similar Teachers</h3>
          {isLoading ? (
            <div>Loading similar teachers...</div>
          ) : (
            <div className="space-y-4">
              {similarTeachers.map((teacher) => (
                <div key={teacher.id} className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={teacher.profileImage || `/placeholder.svg?height=40&width=40`}
                      alt={teacher.name}
                    />
                    <AvatarFallback>
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recommended Courses</h3>
          {isLoading ? (
            <div>Loading recommended courses...</div>
          ) : (
            <div className="space-y-4">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{course.title}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs ml-1">{course.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 text-sm">
                View More Courses
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

