import { ProgressTracker } from "@/app/dashboard/teacher/_components/progress-tracker";

export default function page() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Student Progress</h2>
      <ProgressTracker />
    </div>
  );
}
