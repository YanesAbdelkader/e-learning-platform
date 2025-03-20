import { CoursesList } from "./_components/courses-list"


export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <main className="flex-1 p-6 md:p-8 lg:p-10">
            <div>
              <CoursesList filter="all" />
            </div>
        </main>
      </div>
    </div>
  )
}

