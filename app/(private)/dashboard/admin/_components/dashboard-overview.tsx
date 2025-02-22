"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, DollarSign, AlertCircle } from "lucide-react";
import dynamic from "next/dynamic";

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const stats = [
  { title: "Total Users", value: "10,483", icon: Users },
  { title: "Active Courses", value: "243", icon: BookOpen },
  { title: "Revenue", value: "84,382 DA", icon: DollarSign },
  { title: "Open Issues", value: "23", icon: AlertCircle },
];

const userGrowthData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "User Growth",
      data: [1000, 2000, 3000, 4500, 6000, 10483],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Monthly Revenue",
      data: [5000, 10000, 15000, 20000, 25000, 30000],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function DashboardOverview() {return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={userGrowthData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={revenueData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
