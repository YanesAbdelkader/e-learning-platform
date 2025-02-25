import { notFound } from "next/navigation";
import TeacherProfile from "./_components/teacher-profile";
import img from "@/assets/image.jpg";

const teachers = [
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
];

export function generateStaticParams() {
  return teachers.map((teacher) => ({ id: teacher.id.toString() }));
}

export default function TeacherPage({ params }: { params: { id: string } }) {
  // Ensure params.id is converted to a number
  const teacher = teachers.find((t) => t.id === Number(params.id));

  if (!teacher) {
    notFound();
  }

  return <TeacherProfile teacher={teacher} />;
}
