"use client"
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import img from "@/assets/image.jpg"
import { Star, Clock, BarChart, Award, Heart } from "lucide-react";

const course = {
  id: 1,
  title: "Complete Web Development Bootcamp",
  instructor: "John Smith",
  rating: 4.8,
  students: 12543,
  price: 89.99,
  image: img,
  badge: "Bestseller",
  description:
    "Master web development with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and more!",
  duration: "48 hours",
  level: "Beginner to Advanced",
  lastUpdated: "June 2023",
  curriculum: [
    "Introduction to Web Development",
    "HTML5 and CSS3 Fundamentals",
    "JavaScript Essentials",
    "Responsive Web Design",
    "Introduction to React",
    "Backend Development with Node.js",
    "Database Integration with MongoDB",
    "Deployment and DevOps Basics",
  ],
  skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
};

export default function CoursePreview() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <div className="flex items-center mb-4">
            <Badge variant="secondary" className="mr-2">
              {course.badge}
            </Badge>
            <span className="font-bold mr-2">{course.rating}</span>
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(course.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({course.students.toLocaleString()} students)
            </span>
          </div>
          <p className="text-lg mb-6">{course.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <BarChart className="mr-2" />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center">
              <Award className="mr-2" />
              <span>Certificate of completion</span>
            </div>
            <div className="flex items-center">
              <Star className="mr-2" />
              <span>Last updated {course.lastUpdated}</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
          <ul className="list-disc pl-5 mb-6">
            {course.curriculum.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold mb-4">Skills You&apos;ll Gain</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {course.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="top-4 relative">
            <div 
              className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md cursor-pointer"
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`w-6 h-6 ${liked ? "text-red-500 fill-red-500" : "text-red-500"}`} />
            </div>
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              width={400}
              height={100}
              className="rounded-lg mb-4"
            />
            <div className="text-3xl font-bold mb-4">
              ${course.price.toFixed(2)}
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button variant={"outline"} className="mb-4">Add to Cart</Button>
              <Button variant={"destructive"} className="bg-red-700 mb-4 text-gray-950 dark:text-gray-200">Buy now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
