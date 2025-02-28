import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, BookOpen } from "lucide-react";
import { Teacher } from "@/app/(public)/courses/_lib/shema";

const TeacherCard = ({ teacher }:{teacher:Teacher}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-400 h-85"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={teacher.picture}
          alt={teacher.name}
          className="object-cover transition-transform duration-300 hover:scale-110 w-full h-full"
        />
        {hovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Link href={`teachers/${teacher.id}`}>
              <Button
                variant="secondary"
                className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                View Profile
              </Button>
            </Link>
          </div>
        )}
      </div>
      <CardHeader className="space-y-1">
        <h3 className="font-bold text-lg">{teacher.name}</h3>
        <p className="text-sm text-purple-600 font-medium">{teacher.bio}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{teacher.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{teacher.rating.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{teacher.education}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{teacher.bio}</p>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;
