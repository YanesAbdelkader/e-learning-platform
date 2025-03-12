import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, Play, Award, Clock, BarChart } from "lucide-react"

// Mock data for a specific course
const course = {
  id: 1,
  title: "Complete Web Development Bootcamp",
  instructor: "Dr. Angela Yu",
  thumbnail: "/placeholder.svg?height=400&width=800",
  description:
    "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, and more!",
  progress: 65,
  totalHours: 63,
  completedHours: 41,
  lastAccessed: "2 days ago",
  rating: 4.7,
  students: 352941,
  category: "Web Development",
  level: "All Levels",
  updatedAt: "Last updated 11/2023",
  sections: [
    {
      title: "Introduction to Web Development",
      lectures: [
        { title: "Course Overview", duration: "5:22", completed: true },
        { title: "How the Internet Works", duration: "12:45", completed: true },
        {
          title: "Setting Up Your Development Environment",
          duration: "18:30",
          completed: true,
        },
      ],
    },
    {
      title: "HTML Fundamentals",
      lectures: [
        { title: "Introduction to HTML", duration: "10:15", completed: true },
        {
          title: "HTML Document Structure",
          duration: "14:20",
          completed: true,
        },
        {
          title: "HTML Elements and Attributes",
          duration: "22:10",
          completed: true,
        },
        { title: "HTML Forms", duration: "28:45", completed: false },
      ],
    },
    {
      title: "CSS Styling",
      lectures: [
        { title: "Introduction to CSS", duration: "11:30", completed: true },
        { title: "CSS Selectors", duration: "16:40", completed: true },
        { title: "Box Model", duration: "19:25", completed: false },
        { title: "Flexbox Layout", duration: "25:15", completed: false },
        { title: "CSS Grid", duration: "30:10", completed: false },
      ],
    },
    {
      title: "JavaScript Basics",
      lectures: [
        {
          title: "Introduction to JavaScript",
          duration: "15:20",
          completed: false,
        },
        {
          title: "Variables and Data Types",
          duration: "18:45",
          completed: false,
        },
        { title: "Functions and Scope", duration: "22:30", completed: false },
        { title: "DOM Manipulation", duration: "28:15", completed: false },
      ],
    },
  ],
}

export default function CoursePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the course data based on the ID

  // Calculate total lectures and completed lectures
  const totalLectures = course.sections.reduce((acc, section) => acc + section.lectures.length, 0)
  const completedLectures = course.sections.reduce(
    (acc, section) => acc + section.lectures.filter((lecture) => lecture.completed).length,
    0,
  )

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="bg-muted py-6 sm:py-8">
          <div className="container mx-auto px-4">
            <Link
              href="/mycourses"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to My Courses
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="md:col-span-2 order-2 md:order-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{course.title}</h1>
                <p className="text-base sm:text-lg text-muted-foreground mb-4">Instructor: {course.instructor}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {course.totalHours} hours
                  </span>
                  <span className="flex items-center">
                    <BarChart className="mr-1 h-4 w-4" />
                    {course.level}
                  </span>
                  <span>{course.updatedAt}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/mycourses/course/${course.id}/watch`}>
                  <Button className="gap-2 w-full sm:w-auto">
                    <Play className="h-4 w-4" />
                    Continue Learning
                  </Button>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-1 order-1 md:order-2">
                <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Your Progress</span>
                      <span className="text-sm">{course.progress}% complete</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-2" />
                    <div className="text-sm text-muted-foreground mb-4">
                      {completedLectures} of {totalLectures} lectures completed
                    </div>
                    <div className="flex items-center justify-end text-sm">
                      <span>
                        <Clock className="inline mr-1 h-4 w-4" />
                        {course.completedHours}/{course.totalHours} hrs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 w-full sm:w-auto">
              <TabsTrigger value="overview" className="flex-1 sm:flex-initial">
                Overview
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 sm:flex-initial">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="prose max-w-none">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">About This Course</h2>
                <p>{course.description}</p>
                <p>
                  This course is a comprehensive bootcamp that will take you from beginner to advanced developer. You&apos;ll
                  learn the latest tools and technologies used by professional web developers and build real-world
                  projects that will help you land your dream job.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3">What You&apos;ll Learn</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Build fully-fledged websites and web apps</li>
                  <li>Master frontend development with React</li>
                  <li>Master backend development with Node.js</li>
                  <li>Learn professional developer best practices</li>
                  <li>Build responsive, accessible, and beautiful layouts</li>
                  <li>Create a portfolio of projects to apply for developer jobs</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="text-center py-8 sm:py-12">
                <Award className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Course Rating</h3>
                <div className="text-2xl sm:text-3xl font-bold mb-1">{course.rating}/5</div>
                <p className="text-muted-foreground">Based on {course.students.toLocaleString()} students</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

