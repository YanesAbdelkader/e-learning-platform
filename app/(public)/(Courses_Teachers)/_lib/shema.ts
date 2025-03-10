export type Course = {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: number;
  level: string;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  name: string;
  description: string
};

export type Teacher = {
  id: number;
  name: string;
  email: string;
  subjects: string[];
  rating: number;
  contactInfo: string;
  certifications: string[];
  education:string [];
  links: string[];
  bio: string;
  picture: string;
};

export type SearchType = "Courses" | "Teachers";

export type SearchResult = {
  Courses: Course[];
  Teachers: Teacher[];
  pages: number;
};
