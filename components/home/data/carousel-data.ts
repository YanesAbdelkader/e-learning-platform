import p0 from "@/assets/p01.jpeg";
import p1 from "@/assets/p02.jpg";
import p2 from "@/assets/p03.jpg";
import { StaticImageData } from "next/image";

// Define the carousel item type for better type safety
export type CarouselItemType = {
  id: string;
  title: string;
  description: string;
  imageSrc: StaticImageData | string;
  color: string;
  textPosition: "left" | "right" | "center";
  ctaText?: string;
  ctaLink?: string;
  tag?: string;
};

// Fake carousel data
export const carouselItems: CarouselItemType[] = [
  {
    id: "item-1",
    title: "Master In-Demand Skills",
    description:
      "Gain the expertise you need with industry-relevant courses designed for your growth.",
    imageSrc: p0,
    color: "from-blue-600 to-indigo-600",
    textPosition: "left",
    ctaText: "Explore Courses",
    ctaLink: "/courses",
    tag: "Premium Learning Experience",
  },
  {
    id: "item-2",
    title: "Learn from Industry Leaders",
    description:
      "Get insights from top professionals and apply their knowledge to advance your career.",
    imageSrc: p1,
    color: "from-purple-600 to-pink-600",
    textPosition: "left",
    ctaText: "Meet Our Experts",
    ctaLink: "/instructors",
    tag: "Expert Guidance",
  },
  {
    id: "item-3",
    title: "Flexible Learning Paths",
    description:
      "Personalize your learning experience to fit your lifestyle and career goals.",
    imageSrc: p2,
    color: "from-green-600 to-teal-600",
    textPosition: "right",
    ctaText: "View Learning Paths",
    ctaLink: "/paths",
    tag: "Personalized Education",
  },
  {
    id: "item-4",
    title: "Interactive Workshops",
    description:
      "Engage in hands-on learning experiences that build practical skills through real-world projects.",
    imageSrc: "/placeholder.svg?height=1080&width=1920",
    color: "from-amber-500 to-orange-600",
    textPosition: "center",
    ctaText: "Join a Workshop",
    ctaLink: "/workshops",
    tag: "Hands-on Learning",
  },
  {
    id: "item-5",
    title: "Global Community",
    description:
      "Connect with learners worldwide, share insights, and grow your professional network.",
    imageSrc: "/placeholder.svg?height=1080&width=1920",
    color: "from-cyan-500 to-blue-500",
    textPosition: "left",
    ctaText: "Join Community",
    ctaLink: "/community",
    tag: "Networking Opportunities",
  },
];
