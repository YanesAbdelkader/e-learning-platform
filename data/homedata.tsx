import { Category, Course, Teacher } from "./types";
import { Award, BookOpen, Users, Zap } from "lucide-react";
import img from "@/assets/image.jpg"

export const categories: Category[] = [
  { id: 1, name: "All Categories" },
  { id: 2, name: "Development" },
  { id: 3, name: "Business" },
  { id: 4, name: "IT & Software" },
  { id: 5, name: "Design" },
  { id: 6, name: "Marketing" },
];

export const courses: Course[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    rating: 4.8,
    students: 12543,
    price: 89.99,
    image: img,
    badge: "Bestseller",
    category: "Development",
  },
  {
    id: 2,
    title: "Advanced Machine Learning Course",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 8765,
    price: 94.99,
    image: img,
    badge: "New",
    category: "Business",
  },
  {
    id: 3,
    title: "Digital Marketing Masterclass",
    instructor: "Mike Wilson",
    rating: 4.7,
    students: 15234,
    price: 79.99,
    image: img,
    badge: "Popular",
    category: "IT & Software",
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    instructor: "Emma Davis",
    rating: 4.8,
    students: 9876,
    price: 84.99,
    image: img,
    badge: "Trending",
    category: "Design",
  },
  {
    id: 5,
    title: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    rating: 4.8,
    students: 12543,
    price: 89.99,
    image: img,
    badge: "Bestseller",
    category: "Development",
  },
  {
    id: 6,
    title: "Advanced Machine Learning Course",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 8765,
    price: 94.99,
    image: img,
    badge: "New",
    category: "Business",
  },
  {
    id: 7,
    title: "Digital Marketing Masterclass",
    instructor: "Mike Wilson",
    rating: 4.7,
    students: 15234,
    price: 79.99,
    image: img,
    badge: "Popular",
    category: "IT & Software",
  },
  {
    id: 8,
    title: "UI/UX Design Fundamentals",
    instructor: "Emma Davis",
    rating: 4.8,
    students: 9876,
    price: 84.99,
    image: img,
    badge: "Trending",
    category: "Design",
  },
];

export const teachers: Teacher[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    expertise: "Data Science & Machine Learning",
    rating: 4.9,
    students: 45892,
    courses: 12,
    image: img,
    description:
      "Former Google AI researcher with PhD in Computer Science. Specializes in making complex concepts accessible to all.",
    achievements: ["Top Instructor 2024", 'Author of "AI for Everyone"'],
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    expertise: "Web Development",
    rating: 4.8,
    students: 38567,
    courses: 15,
    image: img,
    description:
      "Full-stack developer with 15 years of industry experience. Known for practical, project-based teaching approach.",
    achievements: ["5 Million Students Taught", "Creator of WebDev Bootcamp"],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    expertise: "UX/UI Design",
    rating: 4.9,
    students: 32145,
    courses: 8,
    image: img,
    description:
      "Award-winning designer who has worked with top Silicon Valley companies. Passionate about teaching design principles.",
    achievements: ["Adobe Certified Expert", "UX Design Award Winner"],
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    expertise: "Business Strategy",
    rating: 4.7,
    students: 28934,
    courses: 10,
    image: img,
    description:
      "Harvard MBA and consultant for Fortune 500 companies. Brings real-world case studies to every lesson.",
    achievements: ["Best-selling Business Author", "TEDx Speaker"],
  },
  {
    id: 5,
    name: "Dr. Sarah Johnson",
    expertise: "Data Science & Machine Learning",
    rating: 4.9,
    students: 45892,
    courses: 12,
    image: img,
    description:
      "Former Google AI researcher with PhD in Computer Science. Specializes in making complex concepts accessible to all.",
    achievements: ["Top Instructor 2024", 'Author of "AI for Everyone"'],
  },
  {
    id: 6,
    name: "Prof. Michael Chen",
    expertise: "Web Development",
    rating: 4.8,
    students: 38567,
    courses: 15,
    image: img,
    description:
      "Full-stack developer with 15 years of industry experience. Known for practical, project-based teaching approach.",
    achievements: ["5 Million Students Taught", "Creator of WebDev Bootcamp"],
  },
  {
    id: 7,
    name: "Emma Rodriguez",
    expertise: "UX/UI Design",
    rating: 4.9,
    students: 32145,
    courses: 8,
    image: img,
    description:
      "Award-winning designer who has worked with top Silicon Valley companies. Passionate about teaching design principles.",
    achievements: ["Adobe Certified Expert", "UX Design Award Winner"],
  },
  {
    id: 8,
    name: "Dr. James Wilson",
    expertise: "Business Strategy",
    rating: 4.7,
    students: 28934,
    courses: 10,
    image: img,
    description:
      "Harvard MBA and consultant for Fortune 500 companies. Brings real-world case studies to every lesson.",
    achievements: ["Best-selling Business Author", "TEDx Speaker"],
  },
];

export const features = [
  {
    title: "Expert Instructors",
    description:
      "Learn from top professionals with real-world experience in their fields.",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
  },
  {
    title: "Diverse Course Catalog",
    description:
      "Explore a vast selection of courses across multiple disciplines.",
    icon: <Users className="w-6 h-6 text-primary" />,
  },
  {
    title: "Flexible Learning",
    description:
      "Access courses anytime, anywhere, and learn at your own pace.",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    title: "Recognized Certificates",
    description: "Earn industry-recognized certificates to boost your career.",
    icon: <Award className="w-6 h-6 text-primary" />,
  },
];
