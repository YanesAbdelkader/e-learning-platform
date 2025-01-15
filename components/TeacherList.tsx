import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const teachers = [
  { name: 'Dr. Jane Smith', subject: 'Computer Science', rating: 4.9, image: '/placeholder.svg?height=200&width=200' },
  { name: 'Prof. John Doe', subject: 'Mathematics', rating: 4.8, image: '/placeholder.svg?height=200&width=200' },
  { name: 'Dr. Emily Brown', subject: 'Biology', rating: 4.7, image: '/placeholder.svg?height=200&width=200' },
]

export default function TeacherList() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">Our Top-Rated Teachers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.name}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <CardTitle>{teacher.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">Rating: {teacher.rating}/5.0</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

