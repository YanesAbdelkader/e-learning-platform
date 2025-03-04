"use server"

import type { Course, Teacher, Category } from "@/app/_lib/shema"

// Mock data for categories
const mockCategories: Category[] = [
  { id: 1, name: "Programming", description: "Learn to code" },
  { id: 2, name: "Design", description: "Master design principles" },
  { id: 3, name: "Business", description: "Develop business skills" },
  { id: 4, name: "Marketing", description: "Learn marketing strategies" },
]

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: 1,
    user_id: 101,
    category_id: 1,
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript programming",
    image: "/placeholder.svg?height=200&width=300",
    price: "49.99",
    duration: 12,
    level: "Beginner",
    created_at: "2023-01-15",
    updated_at: "2023-02-20",
  },
  {
    id: 2,
    user_id: 102,
    category_id: 1,
    title: "Advanced React Development",
    description: "Master React hooks, context API and more",
    image: "/placeholder.svg?height=200&width=300",
    price: "79.99",
    duration: 20,
    level: "Advanced",
    created_at: "2023-03-10",
    updated_at: "2023-04-15",
  },
  {
    id: 3,
    user_id: 103,
    category_id: 2,
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of effective user interface design",
    image: "/placeholder.svg?height=200&width=300",
    price: "59.99",
    duration: 15,
    level: "Intermediate",
    created_at: "2023-02-05",
    updated_at: "2023-03-20",
  },
  {
    id: 4,
    user_id: 104,
    category_id: 3,
    title: "Business Strategy",
    description: "Develop effective business strategies",
    image: "/placeholder.svg?height=200&width=300",
    price: "89.99",
    duration: 25,
    level: "Advanced",
    created_at: "2023-01-20",
    updated_at: "2023-02-28",
  },
]

// Mock data for teachers
const mockTeachers: Teacher[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    subjects: ["JavaScript", "React", "Web Development"],
    rating: 4.8,
    contactInfo: "+1 (555) 123-4567",
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
    education: ["Ph.D. in Computer Science", "M.S. in Software Engineering"],
    links: ["https://github.com/sarahjohnson", "https://linkedin.com/in/sarahjohnson"],
    bio: "Dr. Sarah Johnson is a web development expert with over 10 years of industry experience. She specializes in modern JavaScript frameworks and cloud technologies.",
    picture: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "michael.chen@example.com",
    subjects: ["UI/UX Design", "Figma", "Adobe XD"],
    rating: 4.9,
    contactInfo: "+1 (555) 987-6543",
    certifications: ["Adobe Certified Expert", "Figma Certified Professional"],
    education: ["M.F.A. in Design", "B.A. in Visual Arts"],
    links: ["https://dribbble.com/michaelchen", "https://behance.net/michaelchen"],
    bio: "Professor Michael Chen is a renowned UI/UX designer who has worked with Fortune 500 companies. He brings real-world design challenges to his teaching approach.",
    picture: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    email: "emma.rodriguez@example.com",
    subjects: ["Business Strategy", "Entrepreneurship", "Marketing"],
    rating: 4.7,
    contactInfo: "+1 (555) 456-7890",
    certifications: ["Project Management Professional (PMP)", "Certified Business Analyst"],
    education: ["MBA", "B.S. in Business Administration"],
    links: ["https://linkedin.com/in/emmarodriguez", "https://twitter.com/emmarodriguez"],
    bio: "Emma Rodriguez is a business strategist and entrepreneur who has founded three successful startups. She teaches practical business skills based on her extensive experience.",
    picture: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    email: "james.wilson@example.com",
    subjects: ["Data Science", "Machine Learning", "Python"],
    rating: 4.6,
    contactInfo: "+1 (555) 789-0123",
    certifications: ["TensorFlow Developer Certificate", "Microsoft Certified: Azure Data Scientist Associate"],
    education: ["Ph.D. in Statistics", "M.S. in Computer Science"],
    links: ["https://github.com/jameswilson", "https://kaggle.com/jameswilson"],
    bio: "Dr. James Wilson specializes in data science and machine learning. He has published numerous research papers and worked on AI projects for major tech companies.",
    picture: "/placeholder.svg?height=200&width=200",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Server action to get categories
export async function getCategories(): Promise<Category[]> {
  // Simulate API call delay
  await delay(500)

  // In a real app, this would be a fetch to your Laravel API
  // return fetch('https://your-laravel-api.com/api/categories').then(res => res.json());

  return mockCategories
}

// Server action to get courses with filtering
export async function getCourses(minRating = 0, maxPrice = 100): Promise<Course[]> {
  // Simulate API call delay
  await delay(1000)

  // In a real app, this would be a fetch to your Laravel API with query params
  // return fetch(`https://your-laravel-api.com/api/courses?minRating=${minRating}&maxPrice=${maxPrice}`).then(res => res.json());

  // Simulate filtering
  return mockCourses.filter((course) => {
    if (Number.parseFloat(course.price) > maxPrice) return false
    return true
  })
}

// Server action to get teachers with filtering
export async function getTeachers(minRating = 0): Promise<Teacher[]> {
  // Simulate API call delay
  await delay(1000)

  // In a real app, this would be a fetch to your Laravel API with query params
  // return fetch(`https://your-laravel-api.com/api/teachers?minRating=${minRating}`).then(res => res.json());

  // Simulate filtering
  return mockTeachers.filter((teacher) => {
    if (teacher.rating < minRating) return false
    return true
  })
}

