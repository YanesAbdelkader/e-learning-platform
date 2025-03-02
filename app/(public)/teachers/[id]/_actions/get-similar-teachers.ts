import type { Teacher } from "@/types/teacher"

export async function getSimilarTeachers(teacherId: string): Promise<Teacher[]> {
  // In a real application, you would fetch this data from your API
  // Example API call:
  // const response = await fetch(`/api/teachers/${teacherId}/similar`)
  // if (!response.ok) throw new Error('Failed to fetch similar teachers')
  // return response.json()

  // For now, return mock data
  return [
    {
      id: "teacher1",
      name: "Sarah Johnson",
      profileImage: "/placeholder.svg?height=40&width=40&text=SJ",
      subject: "Web Development",
      shortBio: "",
      bio: "",
      rating: 4.7,
      studentCount: 25000,
      courseCount: 8,
      isFollowing: false,
      achievements: [],
      topCourses: [],
      certifications: [],
      education: [],
      contactInfo: {},
      socialLinks: [],
      subjects: [],
    },
    {
      id: "teacher2",
      name: "David Lee",
      profileImage: "/placeholder.svg?height=40&width=40&text=DL",
      subject: "Frontend Development",
      shortBio: "",
      bio: "",
      rating: 4.9,
      studentCount: 42000,
      courseCount: 12,
      isFollowing: false,
      achievements: [],
      topCourses: [],
      certifications: [],
      education: [],
      contactInfo: {},
      socialLinks: [],
      subjects: [],
    },
    {
      id: "teacher3",
      name: "Emily Rodriguez",
      profileImage: "/placeholder.svg?height=40&width=40&text=ER",
      subject: "Full-Stack Development",
      shortBio: "",
      bio: "",
      rating: 4.6,
      studentCount: 31000,
      courseCount: 10,
      isFollowing: false,
      achievements: [],
      topCourses: [],
      certifications: [],
      education: [],
      contactInfo: {},
      socialLinks: [],
      subjects: [],
    },
  ]
}

