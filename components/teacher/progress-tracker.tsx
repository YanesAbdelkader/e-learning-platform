"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

const initialStudents = [
  { id: 1, name: "Alice Johnson", progress: 75, course: "Introduction to React" },
  { id: 2, name: "Bob Smith", progress: 60, course: "Advanced JavaScript" },
  { id: 3, name: "Charlie Brown", progress: 90, course: "Web Design Fundamentals" },
  { id: 4, name: "Diana Ross", progress: 85, course: "Node.js Essentials" },
  { id: 5, name: "Ethan Hunt", progress: 70, course: "Python for Beginners" },
]

export function ProgressTracker() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = initialStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search students or courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      {filteredStudents.map((student) => (
        <Card key={student.id}>
          <CardHeader>
            <CardTitle>{student.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{student.course}</p>
            <Progress value={student.progress} className="w-full" />
            <p className="mt-2 text-sm text-muted-foreground">{student.progress}% complete</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

