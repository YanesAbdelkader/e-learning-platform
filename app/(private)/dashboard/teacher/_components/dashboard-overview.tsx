"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js"
import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)

const courseEnrollmentData = {
  labels: ["React Basics", "Advanced JS", "Web Design", "Node.js", "Python"],
  datasets: [
    {
      label: "Enrollments",
      data: [65, 59, 80, 81, 56],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
}

const studentProgressData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
  datasets: [
    {
      label: "Average Progress",
      data: [20, 35, 45, 60, 75],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
}

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+2 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48,352{" "}DA</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={courseEnrollmentData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={studentProgressData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

