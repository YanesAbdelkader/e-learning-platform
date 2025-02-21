import { z } from "zod";

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
};

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required").regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
  category_id: z.number().int().positive("Category is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  image: z.string(),
});


export type CourseFormData = z.infer<typeof courseSchema>;
