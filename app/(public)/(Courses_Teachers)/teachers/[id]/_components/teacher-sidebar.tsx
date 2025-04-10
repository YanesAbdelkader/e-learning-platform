import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, ArrowRight } from "lucide-react";
import { Course } from "../_types/teacher";

interface TeacherSidebarProps {
  subjects: string[];
  recommendedCourses: Course[];
}

export default function TeacherSidebar({
  subjects,
  recommendedCourses,
}: TeacherSidebarProps) {

  const handleCourseClick = (courseId: string) => {
    redirect(`/courses/${courseId}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Subjects</h3>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject, index) => (
              <Badge key={index} variant="secondary">
                {subject}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="text-lg font-semibold mb-4">Best Courses</h3>
          {recommendedCourses.length > 0 ? (
            <div className="space-y-2">
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-2 hover:bg-muted/50 p-1 rounded-lg transition-colors"
                >
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-2">
                      {course.title}
                    </p>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs ml-1">{course.rating}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No courses found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
