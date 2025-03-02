import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Users, BookOpen } from "lucide-react";
import { Teacher } from "../_types/teacher";

interface TeacherHeaderProps {
  teacher: Teacher;
  isFollowing: boolean;
  onFollowToggle: () => void;
}

export default function TeacherHeader({
  teacher,
  isFollowing,
  onFollowToggle,
}: TeacherHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <Avatar className="w-24 h-24 border-2 border-primary/20">
        <AvatarImage
          src={teacher.profileImage || "/placeholder.svg?height=96&width=96"}
          alt={teacher.name}
        />
        <AvatarFallback>
          {teacher.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-4 flex-1">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{teacher.name}</h1>
            <Button
              onClick={onFollowToggle}
              variant={isFollowing ? "outline" : "default"}
              className="mt-2"
            >
              {isFollowing ? "Following" : "Follow Teacher"}
            </Button>
          </div>

          <p className="text-xl text-purple-500">{teacher.subject}</p>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{teacher.rating}</span>
            <span className="text-muted-foreground">Rating</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">
              {teacher.studentCount.toLocaleString()}
            </span>
            <span className="text-muted-foreground">Students</span>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-500" />
            <span className="font-semibold">{teacher.courseCount}</span>
            <span className="text-muted-foreground">Courses</span>
          </div>
        </div>

        <p className="text-muted-foreground">{teacher.shortBio}</p>
      </div>
    </div>
  );
}
