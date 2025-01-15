import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'John Smith',
    rating: 4.8,
    students: 12543,
    price: 89.99,
    image: '/placeholder.svg?height=200&width=300',
    badge: 'Bestseller',
  },
  {
    id: 2,
    title: 'Advanced Machine Learning Course',
    instructor: 'Sarah Johnson',
    rating: 4.9,
    students: 8765,
    price: 94.99,
    image: '/placeholder.svg?height=200&width=300',
    badge: 'New',
  },
  {
    id: 3,
    title: 'Digital Marketing Masterclass',
    instructor: 'Mike Wilson',
    rating: 4.7,
    students: 15234,
    price: 79.99,
    image: '/placeholder.svg?height=200&width=300',
    badge: 'Popular',
  },
  {
    id: 4,
    title: 'UI/UX Design Fundamentals',
    instructor: 'Emma Davis',
    rating: 4.8,
    students: 9876,
    price: 84.99,
    image: '/placeholder.svg?height=200&width=300',
    badge: 'Trending',
  },
]

export default function CourseGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <div className="relative">
            <Image
              src={course.image}
              alt={course.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            {course.badge && (
              <Badge className="absolute top-2 left-2">{course.badge}</Badge>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
            <p className="text-sm text-muted-foreground">{course.instructor}</p>
            <div className="flex items-center mt-2">
              <span className="font-bold mr-1">{course.rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(course.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                ({course.students.toLocaleString()})
              </span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <span className="font-bold">${course.price}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

