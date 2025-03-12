import Link from "next/link"
import { CoursesList } from "../_components/courses-list"

export default function InProgressPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold tracking-tight">In Progress Courses</h1>
              <Link
                href="/mycourses"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                View All Courses
              </Link>
            </div>
            <CoursesList filter="in-progress" />
          </div>
        </main>
      </div>
    </div>
  )
}

