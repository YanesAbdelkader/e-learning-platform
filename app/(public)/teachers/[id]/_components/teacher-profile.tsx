import Image, { StaticImageData } from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, BookOpen, Award } from "lucide-react"

type Teacher = {
  id: number
  name: string
  expertise: string
  rating: number
  students: number
  courses: number
  image: StaticImageData 
  description: string
  achievements: string[]
}

export default function TeacherProfile({ teacher }: { teacher: Teacher }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={teacher.image || "/placeholder.svg"}
              alt={teacher.name}
              width={400}
              height={400}
              className="h-full w-full object-cover md:w-96"
            />
          </div>
          <div className="p-8">
            <CardHeader>
              <h1 className="text-3xl font-bold text-gray-900">{teacher.name}</h1>
              <p className="mt-2 text-xl text-purple-600">{teacher.expertise}</p>
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-2 font-bold">{teacher.rating}</span>
                <span className="ml-2 text-gray-600">Rating</span>
              </div>
              <div className="mt-4 flex items-center">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="ml-2 font-bold">{teacher.students.toLocaleString()}</span>
                <span className="ml-2 text-gray-600">Students</span>
              </div>
              <div className="mt-4 flex items-center">
                <BookOpen className="h-5 w-5 text-green-500" />
                <span className="ml-2 font-bold">{teacher.courses}</span>
                <span className="ml-2 text-gray-600">Courses</span>
              </div>
              <p className="mt-6 text-gray-600">{teacher.description}</p>
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {teacher.achievements.map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center">
                      <Award className="mr-1 h-4 w-4" />
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}

