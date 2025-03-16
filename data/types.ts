import { StaticImageData } from "next/image";

export type Course = {
  id: number;
  title: string;
  instructor: { id: number; name: string; lastname: string };
  rating: number;
  students: number;
  price: string;
  image: string | StaticImageData;
  category: { id: number; name: string; description?: string };
};

export type Category = {
  id: number;
  name: string;
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
    rating: number | null;
    contactinfo: string;
    certifications: string[];
    education: string;
    links: string[];
    bio: string;
    verified: boolean;
  };
};
