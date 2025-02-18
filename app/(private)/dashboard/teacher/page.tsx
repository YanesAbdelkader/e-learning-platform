import { DashboardOverview } from "@/app/dashboard/teacher/_components/dashboard-overview";

export default function page() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">
        Welcome back, Teacher!
      </h2>
      <DashboardOverview />
    </div>
  );
}
