import { CoursesList } from "../_components/courses-list"

export default function InProgressPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <CoursesList filter="in-progress" />
          </div>
        </main>
      </div>
    </div>
  )
}

