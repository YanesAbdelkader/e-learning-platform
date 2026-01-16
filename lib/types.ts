export interface ApiResponse<T> {
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export type Category = {
  id: number;
  name: string;
  description?: string;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  category: Category;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  duration: number;
  instructor: Teacher;
  rating: number;
  students: number;
  price: number;
};

export type Teacher = {
  id: number;
  name: string;
  lastname: string;
  picture?: string;
  email?: string;
  role?: string;
  course_count?: number;
  students?: number;
  teacher_info?: {
    id: number;
    user_id: number;
    subjects: string[];
    rating: number | null;
    contactinfo: string;
    certifications: string[];
    education: string;
    links: string[];
    bio: string;
    verified: boolean;
  };
};

export type SearchOption = "Courses" | "Teachers";

export type SearchResult = {
  Courses: Course[];
  Teachers: Teacher[];
};

export type Notification = {
  title: string;
  description: string;
  variant?: "destructive" | "default";
};

export type SingleSignOn = {
  provider: string;
  description: string;
  Icon: React.ElementType;
};
