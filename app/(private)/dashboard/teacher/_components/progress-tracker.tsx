"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

type StudentProgress = {
  id: number;
  name: string;
  progress: number;
  course: string;
};

interface ProgressTrackerProps {
  initialStudents: StudentProgress[];
}

export function ProgressTracker({ initialStudents }: ProgressTrackerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [minProgress, setMinProgress] = useState(0)

  const filteredStudents = useMemo(() => {
    let result = initialStudents;
    
    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(term) ||
          student.course.toLowerCase().includes(term)
      );
    }
    
    // Apply progress filter
    result = result.filter(student => student.progress >= minProgress);
    
    return result;
  }, [initialStudents, searchTerm, minProgress]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProgressChange = (value: number[]) => {
    setMinProgress(value[0]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search students or courses..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <div className="flex items-center gap-4 w-full md:w-1/2">
          <span className="text-sm whitespace-nowrap">Min Progress: {minProgress}%</span>
          <Slider
            defaultValue={[0]}
            max={100}
            step={1}
            onValueChange={handleProgressChange}
            className="w-full"
          />
        </div>
      </div>
      
      {filteredStudents.length === 0 ? (
        <p className="text-center text-muted-foreground">No students match the filters</p>
      ) : (
        filteredStudents.map((student) => (
          <StudentProgressCard key={student.id} student={student} />
        ))
      )}
    </div>
  );
}

interface StudentProgressCardProps {
  student: StudentProgress;
}

function StudentProgressCard({ student }: StudentProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{student.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{student.course}</p>
        <Progress value={student.progress} className="w-full" />
        <p className="mt-2 text-sm text-muted-foreground">{student.progress}% complete</p>
      </CardContent>
    </Card>
  );
}