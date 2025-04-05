export interface Teacher {
  id: string
  name: string
  profileImage?: string
  subject: string
  bio: string
  rating: number
  studentCount: number
  courseCount: number
  isFollowing: boolean
  certifications: string[]
  education: string
  contactInfo: string
  socialLinks: string[]
  subjects: string[]
}


export interface Course {
  id: string
  teacherId: string
  title: string
  rating: number
  reviewCount: number
}


