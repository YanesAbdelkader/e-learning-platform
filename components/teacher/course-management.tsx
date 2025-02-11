"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Course = {
  id: number
  title: string
  description: string
  enrollments: number
  rating: number
}

const initialCourses: Course[] = [
  { id: 1, title: "Introduction to React", description: "Learn the basics of React", enrollments: 120, rating: 4.5 },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript concepts",
    enrollments: 80,
    rating: 4.2,
  },
  {
    id: 3,
    title: "Web Design Fundamentals",
    description: "Master the principles of web design",
    enrollments: 150,
    rating: 4.8,
  },
]

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [newCourse, setNewCourse] = useState({ title: "", description: "" })
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)

  const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const addCourse = () => {
    setCourses([...courses, { ...newCourse, id: Date.now(), enrollments: 0, rating: 0 }])
    setNewCourse({ title: "", description: "" })
  }

  const updateCourse = () => {
    if (editingCourse) {
      setCourses(courses.map((course) => (course.id === editingCourse.id ? editingCourse : course)))
      setEditingCourse(null)
    }
  }

  const deleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addCourse}>Add Course</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Enrollments</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>{course.enrollments}</TableCell>
              <TableCell>{course.rating}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Course</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="edit-title"
                          value={editingCourse?.title}
                          onChange={(e) =>
                            setEditingCourse(editingCourse ? { ...editingCourse, title: e.target.value } : null)
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="edit-description"
                          value={editingCourse?.description}
                          onChange={(e) =>
                            setEditingCourse(editingCourse ? { ...editingCourse, description: e.target.value } : null)
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={updateCourse}>Update Course</Button>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => deleteCourse(course.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

