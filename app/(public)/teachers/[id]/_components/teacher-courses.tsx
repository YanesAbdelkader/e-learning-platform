import { Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Course } from "../_types/teacher"
import Link from "next/link"

interface TeacherCoursesProps {
  courses: Course[]
  totalCourses: number
}

export default function TeacherCourses({ courses, totalCourses }: TeacherCoursesProps) {
  return (
    <>
      <h3 className="text-lg font-semibold">Top-Rated Courses</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{course.title}</h4>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm ml-1">{course.rating}</span>
                    <span className="text-xs text-muted-foreground ml-2">({course.reviewCount} reviews)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{course.description}</p>
                </div>
                {course.badge && <Badge>{course.badge}</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link href={`/courses?teacher=${courses[0]?.teacherId}`}>
        <Button variant="outline" className="w-full mt-4">
          View All {totalCourses} Courses <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </>
  )
}

