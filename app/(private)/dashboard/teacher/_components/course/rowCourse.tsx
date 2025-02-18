import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { TableRow, TableCell } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import {  Course } from '../../_actions/CoursesAction'
import { Input } from '@/components/ui/input'



export default function RowCourse({ course }: { course: Course }) {

  return (
        <TableRow>
          <TableCell>{course.title}</TableCell>
          <TableCell>{course.description}</TableCell>
          <TableCell>{course.price}</TableCell>
          <TableCell>{course.duration}</TableCell>
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
                <form
                //   action={async (formData) => {
                //     await updateCourse(course.id, formData)
                //   }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={`edit-title-${course.id}`} className="text-right">
                        Title
                      </Label>
                      <Input
                        id={`edit-title-${course.id}`}
                        name="title"
                        defaultValue={course.title}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={`edit-description-${course.id}`} className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id={`edit-description-${course.id}`}
                        name="description"
                        defaultValue={course.description}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <Button type="submit">Update Course</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              variant="destructive"
            //   onClick={async () => {
            //     await deleteCourse(course.id)
            //   }}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
  )
}
