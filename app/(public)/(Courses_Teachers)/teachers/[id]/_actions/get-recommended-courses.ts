import type { Course } from "@/types/teacher"

export async function getRecommendedCourses(teacherId: string): Promise<Course[]> {
  // In a real application, you would fetch this data from your API
  // Example API call:
  // const response = await fetch(`/api/teachers/${teacherId}/recommended-courses`)
  // if (!response.ok) throw new Error('Failed to fetch recommended courses')
  // return response.json()

  // For now, return mock data
  return [
    {
      id: "rec-course1",
      teacherId: teacherId,
      title: "Advanced React Patterns",
      description: "Master advanced React patterns and techniques",
      rating: 4.9,
      reviewCount: 1245,
    },
    {
      id: "rec-course2",
      teacherId: teacherId,
      title: "Node.js Microservices",
      description: "Build scalable microservices with Node.js",
      rating: 4.8,
      reviewCount: 987,
    },
    {
      id: "rec-course3",
      teacherId: teacherId,
      title: "TypeScript Deep Dive",
      description: "Comprehensive guide to TypeScript",
      rating: 4.7,
      reviewCount: 756,
    },
  ]
}

