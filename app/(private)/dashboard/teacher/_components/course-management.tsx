"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { type Course, deleteCourse, fetchCategories, fetchCourses } from "../_actions/CoursesAction"
import AddCourse from "./course/Add"
import type { Category } from "../_lib/schemaCourse"
import UpdateCourse from "./course/Update"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown, Loader2 } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type SortOption =
  | "title-asc"
  | "title-desc"
  | "price-asc"
  | "price-desc"
  | "level-asc"
  | "level-desc"
  | "duration-asc"
  | "duration-desc"

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [sortOption, setSortOption] = useState<SortOption>("title-asc")
  const { toast } = useToast()

  const loadData = async () => {
    setLoading(true)
    try {
      const [coursesData, categoriesData] = await Promise.all([fetchCourses(), fetchCategories()])

      setCourses(Array.isArray(coursesData) ? coursesData : [])
      setCategories(Array.isArray(categoriesData) ? categoriesData : [])
    } catch (error) {
      console.error("Error loading data:", error)
      setCourses([])
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async (courseId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this course?")
    if (!isConfirmed) return

    const result = await deleteCourse(courseId)
    if (result?.success) {
      toast({
        title: "Course Deleted",
        description: result.message,
      })

      await loadData() // Reload courses and categories after deletion
    } else {
      toast({
        title: "Error",
        description: result?.error,
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Filter courses by search term
  const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))

  // Sort filtered courses based on selected sort option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title)
      case "title-desc":
        return b.title.localeCompare(a.title)
      case "price-asc":
        return Number.parseFloat(a.price) - Number.parseFloat(b.price)
      case "price-desc":
        return Number.parseFloat(b.price) - Number.parseFloat(a.price)
      case "level-asc":
        return a.level.localeCompare(b.level)
      case "level-desc":
        return b.level.localeCompare(a.level)
      case "duration-asc":
        return typeof a.duration === "number" && typeof b.duration === "number"
          ? a.duration - b.duration
          : String(a.duration).localeCompare(String(b.duration))
      case "duration-desc":
        return typeof a.duration === "number" && typeof b.duration === "number"
          ? b.duration - a.duration
          : String(b.duration).localeCompare(String(a.duration))
      default:
        return a.title.localeCompare(b.title)
    }
  })

  return (
    <div className="space-y-4">
      {/* Search Bar, Sort Dropdown & Add Button */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setSortOption("title-asc")}>
                <ArrowDownAZ className="mr-2 h-4 w-4" />
                Title (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("title-desc")}>
                <ArrowUpAZ className="mr-2 h-4 w-4" />
                Title (Z-A)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("price-asc")}>Price (Low to High)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("price-desc")}>Price (High to Low)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("level-asc")}>Level (A-Z)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("level-desc")}>Level (Z-A)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("duration-asc")}>
                Duration (Short to Long)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("duration-desc")}>
                Duration (Long to Short)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <AddCourse categories={categories} onCourseAdded={loadData} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        ) : (
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead className="text-left w-[200px]">Title</TableHead>
                <TableHead className="text-left w-[300px]">Description</TableHead>
                <TableHead className="text-left w-[120px]">Level</TableHead>
                <TableHead className="text-left w-[180px]">Category</TableHead>
                <TableHead className="text-left w-[120px]">Price</TableHead>
                <TableHead className="text-left w-[100px]">Duration</TableHead>
                <TableHead className="text-left w-[150px]">Image</TableHead>
                <TableHead className="text-center w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCourses.length > 0 ? (
                sortedCourses.map((course) => (
                  <TableRow key={course.id} className="border-b">
                    <TableCell className="p-4">{course.title}</TableCell>
                    <TableCell className="p-4 truncate max-w-[300px]">{course.description}</TableCell>
                    <TableCell className="p-4">{course.level}</TableCell>
                    <TableCell className="p-4">
                      {categories.find((category) => category.id === course.category_id)?.name || "Unknown"}
                    </TableCell>
                    <TableCell className="p-4">{course.price} DA</TableCell>
                    <TableCell className="p-4">{course.duration}</TableCell>
                    <TableCell className="p-4">
                      <div className="w-[120px] h-[80px] relative">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.image}`}
                          alt="Course Preview"
                          className="border shadow-md object-cover rounded-md"
                          fill
                        />
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-center">
                      <div className="flex gap-2 items-center justify-center">
                        <Link href={`/dashboard/teacher/courses/${course.id}`}>
                          <Button variant="outline">Episodes</Button>
                        </Link>
                        <UpdateCourse course={course} categories={categories} onCourseUpdated={loadData} />
                        <Button
                          variant="destructive"
                          className="px-3"
                          onClick={() => handleDeleteCourse(String(course.id))}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center p-6">
                    <div className="flex flex-col items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
                      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">No courses found</h2>
                      <p className="text-gray-500 dark:text-gray-400">Start adding courses now!</p>
                      <AddCourse categories={categories} onCourseAdded={loadData} />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

