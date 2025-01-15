import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const courses = [
  { title: 'Introduction to Python Programming', category: 'Programming', rating: 4.8, image: '/placeholder.svg?height=200&width=300' },
  { title: 'Advanced Machine Learning', category: 'Data Science', rating: 4.9, image: '/placeholder.svg?height=200&width=300' },
  { title: 'Web Development with React', category: 'Web Development', rating: 4.7, image: '/placeholder.svg?height=200&width=300' },
]

export default function CourseList() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">Our Top Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.title}>
            <Image
              src={course.image}
              alt={course.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge>{course.category}</Badge>
              <p className="mt-2 text-lg font-semibold">Rating: {course.rating}/5.0</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

