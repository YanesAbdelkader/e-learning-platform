export interface FormState {
  success: boolean
  error: string
  message: string
}

export interface TeacherFormData {
  email: string
  emailVerified: boolean
  name: string
  lastname: string
  password: string
  confirmPassword: string
  contactInfo: string
  picture: string
  subjects: string[]
  certifications: string[]
  education: string[]
  links: string[]
  bio: string
}

export interface StepProps {
  formData: TeacherFormData
  updateFormData: (updates: Partial<TeacherFormData>) => void
}

