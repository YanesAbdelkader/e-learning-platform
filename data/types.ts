import { StaticImageData } from "next/image";

export type Course = {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  image: string | StaticImageData;
  badge?: string;
  category: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Teacher = {
  id: number;
  name: string;
  expertise: string;
  rating: number;
  students: number;
  courses: number;
  image: string | StaticImageData;
  description: string;
  achievements: string[];
};