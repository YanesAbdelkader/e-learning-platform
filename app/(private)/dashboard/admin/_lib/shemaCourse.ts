
export type Course = {
  id: number
  title: string
  teacher: string
  enrollments: number
  status: "Published" | "Unpublished"
  unpublishReason?: string
}

export const initialCourses: Course[] = [
  { id: 1, title: "Introduction to React", teacher: "John Doe", enrollments: 150, status: "Published" },
  { id: 2, title: "Advanced JavaScript", teacher: "Jane Smith", enrollments: 120, status: "Published" },
  {
    id: 3,
    title: "Python for Beginners",
    teacher: "Mike Johnson",
    enrollments: 200,
    status: "Unpublished",
    unpublishReason: "Outdated content",
  },
]