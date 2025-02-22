export type Category = {
  id: number
  name: string
  description: string
  coursesCount: number
}

export const initialCategories: Category[] = [
  { id: 1, name: "Web Development", description: "Courses related to web development", coursesCount: 15 },
  { id: 2, name: "Data Science", description: "Courses related to data science and analytics", coursesCount: 10 },
  { id: 3, name: "Mobile Development", description: "Courses for iOS and Android development", coursesCount: 8 },
]