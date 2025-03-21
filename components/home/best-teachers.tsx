import { fetchTeachers } from "@/data/getData";
import type { Teacher } from "@/data/types";
import { TeacherCard } from "./teachers/teacher-card";
import { TeacherSkeleton } from "./teachers/teacher-skeleton";
import { useEffect, useState } from "react";
import { RefreshCw, UserX } from "lucide-react";
import { Button } from "../ui/button";

export function BestTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTeachers();
      setTeachers(result || []);
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("Unable to load teachers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const limitedTeachers = teachers.slice(0, 12);

  return (
    <section aria-labelledby="best-teachers-heading">
      <h2
        id="best-teachers-heading"
        className="text-4xl font-bold text-primary mb-6"
      >
        Learn from the Best
      </h2>

      {error ? (
        <div className="p-6 text-center rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-700 dark:text-red-400">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Refresh
          </button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <TeacherSkeleton key={index} />
          ))}
        </div>
      ) : limitedTeachers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {limitedTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="bg-muted/30 p-6 rounded-full mb-4">
            <UserX className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-gray-700 dark:text-gray-400">
            No teachers available.
          </p>
          <Button
            onClick={fetchData}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 mt-4"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      )}
    </section>
  );
}
