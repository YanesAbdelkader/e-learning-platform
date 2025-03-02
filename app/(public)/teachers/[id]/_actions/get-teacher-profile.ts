import type { Teacher } from "@/types/teacher"

export async function getTeacherProfile(teacherId: string): Promise<Teacher> {
  // In a real application, you would fetch this data from your API
  // Example API call:
  // const response = await fetch(`/api/teachers/${teacherId}`)
  // if (!response.ok) throw new Error('Failed to fetch teacher profile')
  // return response.json()

  // For now, return mock data
  return {
    id: teacherId,
    name: "Prof. Michael Chen",
    profileImage: "/placeholder.svg?height=96&width=96",
    subject: "Web Development",
    shortBio:
      "Full-stack developer with 15 years of industry experience. Known for practical, project-based teaching approach.",
    bio: "Prof. Michael Chen is a seasoned full-stack developer with over 15 years of industry experience. He specializes in JavaScript, React, Node.js, and modern web development practices.\n\nAfter working at several tech giants including Google and Microsoft, Michael decided to share his knowledge with aspiring developers. His teaching philosophy centers around practical, project-based learning that prepares students for real-world challenges.\n\nMichael is known for his ability to explain complex concepts in simple terms, making him one of the most sought-after instructors in web development education.",
    rating: 4.8,
    studentCount: 38567,
    courseCount: 15,
    isFollowing: false,
    achievements: [
      { title: "5 Million Students Taught", type: "milestone" },
      { title: "Creator of WebDev Bootcamp", type: "award" },
    ],
    topCourses: [
      {
        id: "course1",
        teacherId: teacherId,
        title: "Modern JavaScript Masterclass",
        description: "Complete guide to modern JavaScript features and practices",
        rating: 4.9,
        reviewCount: 2345,
        badge: "Bestseller",
      },
      {
        id: "course2",
        teacherId: teacherId,
        title: "React & Next.js: Full Stack Development",
        description: "Build production-ready applications with React and Next.js",
        rating: 4.8,
        reviewCount: 1876,
        badge: "Popular",
      },
      {
        id: "course3",
        teacherId: teacherId,
        title: "CSS Mastery: Advanced Techniques",
        description: "Master advanced CSS techniques and animations",
        rating: 4.7,
        reviewCount: 1245,
      },
    ],
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Developer",
      "Microsoft Certified: Azure Developer Associate",
      "MongoDB Certified Developer",
    ],
    education: [
      {
        degree: "Ph.D. in Computer Science",
        institution: "Stanford University",
        year: "2008",
      },
      {
        degree: "M.S. in Software Engineering",
        institution: "MIT",
        year: "2004",
      },
    ],
    contactInfo: {
      email: "michael.chen@example.com",
      phone: "+1 (555) 123-4567",
      website: "https://www.michaelchen.dev",
    },
    socialLinks: [
      { platform: "twitter", url: "https://twitter.com/michaelchen" },
      { platform: "linkedin", url: "https://linkedin.com/in/michaelchen" },
      { platform: "github", url: "https://github.com/michaelchen" },
    ],
    subjects: ["JavaScript", "React", "Next.js", "Node.js", "TypeScript", "CSS", "HTML", "Full-Stack"],
  }
}

