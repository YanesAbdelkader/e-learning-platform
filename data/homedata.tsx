import { Award, BookOpen, Users, Zap } from "lucide-react";

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
