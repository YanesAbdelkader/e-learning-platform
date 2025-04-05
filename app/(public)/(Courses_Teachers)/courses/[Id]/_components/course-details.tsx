import { Clock, Zap, Calendar, Tag } from "lucide-react";

interface CourseDetailItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function CourseDetails({
  duration,
  level,
  category,
  lastUpdated,
}: {
  duration: string;
  level: string;
  category: string;
  lastUpdated: string;
}) {
  const details: CourseDetailItem[] = [
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Duration",
      value: duration,
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: "Level",
      value: level,
    },
    {
      icon: <Tag className="h-5 w-5" />,
      label: "Category",
      value: category,
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Last updated",
      value: lastUpdated,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {details.map((detail, index) => (
        <div key={index} className="flex items-center p-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mr-3">
            {detail.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {detail.label}
            </p>
            <p className="text-base font-semibold text-gray-700 dark:text-white">
              {detail.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
