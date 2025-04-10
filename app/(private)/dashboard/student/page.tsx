import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarClock, LaptopMinimalCheck, Youtube } from "lucide-react"
import { CourseProgress } from "./_components/course-progress"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<Skeleton className="h-[125px] w-full" />}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <Youtube/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[125px] w-full" />}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
              <CalendarClock />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48.5</div>
            </CardContent>
          </Card>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[125px] w-full" />}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Complited</CardTitle>
              <LaptopMinimalCheck />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
        </Suspense>
      </div>
      <div className="grid gap-4 md:gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Track your progress in current courses</CardDescription>
          </CardHeader>
          <CardContent>
            <CourseProgress />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

