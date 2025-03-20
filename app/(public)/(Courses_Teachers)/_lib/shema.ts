export type Course = {
  duration: number;
  id: number;
  title: string;
  description: string;
  level: string;
  instructor: {
    id: number;
    name: string;
    lastname: string;
  };
  rating: number;
  students: number;
  price: number;
  image: string;
  category: {
    id: number;
    name: string;
    description: string;
  };
};

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type Teacher = {
  students: number;
  id: number;
  name: string;
  lastname: string;
  picture: string;
  email: string;
  role: string;
  course_count: number;
  teacher_info: {
    id: number;
    user_id: number;
    subjects: string[];
    rating: number;
    contactinfo: string;
    certifications: string[];
    education: string;
    links: string[];
    bio: string;
    verified: boolean;
  };
};

export type SearchType = "Courses" | "Teachers";
export type SearchResult = {
  Courses: Course[];
  Teachers: Teacher[];
};
