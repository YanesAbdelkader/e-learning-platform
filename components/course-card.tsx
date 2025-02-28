import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { Course } from "@/app/(public)/courses/_lib/shema";

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-400">
      <div className="relative">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        {course.price && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1">
            {course.price}
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          {course.description}
        </p>
        <div className="flex items-center mb-3">
          <span className="font-bold text-lg mr-2">{course.duration}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(course.duration)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            ({course.price.toLocaleString()})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl">${course.price}</span>
          <Link href={`courses/${course.id}`}>
            <Button variant="outline">Learn More</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
