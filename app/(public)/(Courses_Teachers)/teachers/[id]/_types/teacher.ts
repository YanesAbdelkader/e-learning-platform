export interface Teacher {
  id: string
  name: string
  profileImage?: string
  subject: string
  shortBio: string
  bio: string
  rating: number
  studentCount: number
  courseCount: number
  isFollowing: boolean
  achievements: Achievement[]
  topCourses: Course[]
  certifications: string[]
  education: Education[]
  contactInfo: ContactInfo
  socialLinks: SocialLink[]
  subjects: string[]
}

export interface Achievement {
  title: string
  type: "award" | "milestone"
}

export interface Course {
  id: string
  teacherId: string
  title: string
  description: string
  rating: number
  reviewCount: number
  badge?: string
  imageUrl?: string
}

export interface Education {
  degree: string
  institution: string
  year: string
}

export interface ContactInfo {
  email?: string
  phone?: string
  website?: string
}

export interface SocialLink {
  platform: "twitter" | "linkedin" | "github" | "youtube" | "facebook" | "instagram"
  url: string
}

