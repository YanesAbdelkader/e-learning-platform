import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StarFilledIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Image from "next/image"

interface Course {
  id: string
  title: string
  rating: number
  students: number
  price: number
  image?: string
}

export default function RelatedCourses({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <Image src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.image}`} alt={course.title} className="object-cover" width={40} height={40}/>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-1">{course.title}</h3>
            <div className="flex items-center mb-2">
              <span className="font-medium mr-1">{course.rating}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarFilledIcon
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({course.students.toLocaleString()})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">${course.price}</span>
              <Link href={`/courses/${course.id}`}>
                <Button variant="outline" size="sm">
                  View Course
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

