import { Button } from "@/components/ui/button"
import TeacherCard from "@/components/teacherCard"

const teachers = [
  {
    name: "Dr. Emily Johnson",
    image: "/placeholder.svg?height=400&width=400",
    specialty: "Computer Science",
    rating: 4.9,
    students: 15000,
    courses: 12,
  },
  {
    name: "Prof. Michael Chen",
    image: "/placeholder.svg?height=400&width=400",
    specialty: "Data Science",
    rating: 4.8,
    students: 12000,
    courses: 10,
  },
  {
    name: "Dr. Sarah Williams",
    image: "/placeholder.svg?height=400&width=400",
    specialty: "Artificial Intelligence",
    rating: 4.7,
    students: 10000,
    courses: 8,
  },
  {
    name: "Prof. David Brown",
    image: "/placeholder.svg?height=400&width=400",
    specialty: "Web Development",
    rating: 4.9,
    students: 18000,
    courses: 15,
  },
  {
    name: "Dr. Lisa Taylor",
    image: "/placeholder.svg?height=400&width=400",
    specialty: "Machine Learning",
    rating: 4.8,
    students: 13000,
    courses: 11,
  },
  {
    name: "Prof. Robert Garcia",
    image: "/placeholder.svg?height=400&width=400",
    specialty: "Cybersecurity",
    rating: 4.7,
    students: 9000,
    courses: 7,
  },
]

export default function Teachers() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Our Best Teachers</h1>
          <p className="mt-2">Learn from the experts in their fields</p>
        </div>
      </header>

      <main className="container mx-auto px-2 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.name} {...teacher} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-3">Ready to start learning?</h2>
          <Button size="default">Explore All Courses</Button>
        </div>
      </main>
    </div>
  )
}
