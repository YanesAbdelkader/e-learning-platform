"use client";

import { useState, useEffect } from "react";
import { Check, Circle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { updateCourseStatus } from "../../_actions/CoursesAction";

// Define all possible course statuses
type CourseStatus = "created" | "published" | "unpublished";

interface CourseStatusDropdownProps {
  id: string | number;
  status: CourseStatus;
  load: () => void;
}

export default function CourseStatusDropdown({
  id,
  status: initialStatus,
  load,
}: CourseStatusDropdownProps) {
  const [status, setStatus] = useState<CourseStatus>(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const handleStatusChange = async (newStatus: boolean) => {
    if (isUpdating) return;
    try {
      setIsUpdating(true);
      const result = await updateCourseStatus(String(id), newStatus);
      if (result?.success) {
        toast({
          title: "Status updated",
          description: result.message,
        });
        load();
      }
    } catch (error) {
      console.log("Failed to update course status:", error);
      toast({
        title: "Error",
        description: "Failed to update course status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: CourseStatus) => {
    switch (status) {
      case "published":
        return "text-green-500";
      case "unpublished":
        return "text-red-500";
      case "created":
        return "text-amber-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 rounded-full p-0 border-0"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : (
            <Circle
              className={cn("h-4 w-4 fill-current", getStatusColor(status))}
            />
          )}
          <span className="sr-only">{status}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-28 p-1 text-xs">
        <DropdownMenuItem
          onClick={() => handleStatusChange(true)}
          className="flex items-center justify-between px-2 py-1 h-6"
          disabled={isUpdating || status === "published"}
        >
          <span className="flex items-center gap-1.5">
            <Circle className="h-3 w-3 fill-current text-green-500" />
            <span>Published</span>
          </span>
          {status === "published" && <Check className="h-3 w-3" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange(false)}
          className="flex items-center justify-between px-2 py-1 h-6"
          disabled={isUpdating || status === "unpublished"}
        >
          <span className="flex items-center gap-1.5">
            <Circle className="h-3 w-3 fill-current text-red-500" />
            <span>Unpublished</span>
          </span>
          {status === "unpublished" && <Check className="h-3 w-3" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
