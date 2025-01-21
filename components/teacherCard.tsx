import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"

interface TeacherCardProps {
  name: string
  image: string
  specialty: string
  rating: number
  students: number
  courses: number
}

export default function TeacherCard({ name, image, specialty, rating, students, courses }: TeacherCardProps) {
  return (
    <Card className="overflow-hidden rounded-lg bg-background  pt-4 hover:bg-accent transition-colors duration-200">
      <CardHeader className="p-0">
        <div className="aspect-square w-full relative overflow-hidden rounded-full">
          <Image src={image} alt={name} className="object-cover " fill />
        </div>
      </CardHeader>
      <CardContent className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <Badge variant="secondary" className="mb-4 mx-auto">
          {specialty}
        </Badge>
        <div className="flex items-center mb-2 justify-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          <p>{students.toLocaleString()} students</p>
          <p>{courses} courses</p>
        </div>
      </CardContent>
    </Card>
  )
}
