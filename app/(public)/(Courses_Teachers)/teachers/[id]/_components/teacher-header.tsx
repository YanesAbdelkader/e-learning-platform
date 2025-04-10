"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, BookOpen } from "lucide-react";
import { Teacher } from "../_types/teacher";
import { useState } from "react";
import { followTeacher, unfollowTeacher } from "../_actions/follow-teacher";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { checkAuthStatus } from "@/functions/custom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface TeacherHeaderProps {
  teacher: Teacher;
}

export default function TeacherHeader({ teacher }: TeacherHeaderProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  async function handleFollowToggle() {
    if (!teacher) return;
    try {
      const loggedIn = await checkAuthStatus();
      if (!loggedIn.isLoggedIn) {
        setShowAuthDialog(true);
        return;
      }
      const { success, message } = await (teacher.isFollowing
        ? unfollowTeacher(teacher.id)
        : followTeacher(teacher.id));
      if (success) {
        toast({
          title: "Success",
          description: message,
          variant: "default",
        });
      } else {
        throw new Error(message || "Failed to update follow status");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  }

  function handleLoginRedirect() {
    document.cookie = `lastVisitedPage=${window.location.href}; path=/; max-age=3600`;
    router.push("/login");
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <Avatar className="w-24 h-24 border-2 border-primary/20 hover:border-primary/50 transition-colors">
        <AvatarImage
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${teacher.profileImage}`}
          alt={teacher.name}
          className="object-cover"
        />
        <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100">
          {teacher.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-4 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {teacher.name}
            </h1>
            <p className="text-lg sm:text-xl text-indigo-600 dark:text-indigo-400">
              {teacher.subject}
            </p>
          </div>
          <Button
            onClick={() => handleFollowToggle()}
            variant={teacher.isFollowing ? "outline" : "default"}
            size="sm"
            className={cn(
              "w-full sm:w-auto transition-colors",
              teacher.isFollowing
                ? "text-primary font-semibold hover:bg-accent/90"
                : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            )}
          >
            {teacher.isFollowing ? "Following" : "Follow Teacher"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 sm:gap-6">
          <StatItem
            icon={<Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
            value={teacher.rating}
            label="Rating"
          />
          <StatItem
            icon={<Users className="w-5 h-5 text-blue-400" />}
            value={teacher.studentCount}
            label="Students"
          />
          <StatItem
            icon={<BookOpen className="w-5 h-5 text-green-500" />}
            value={teacher.courseCount}
            label="Courses"
          />
        </div>
      </div>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onLoginRedirect={handleLoginRedirect}
      />
    </div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <div className="flex items-center gap-2 text-sm sm:text-base">
      {icon}
      <span className="font-semibold">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginRedirect: () => void;
}

function AuthDialog({ open, onOpenChange, onLoginRedirect }: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg text-destructive">
            Authentication Required
          </DialogTitle>
          <DialogDescription className="text-base">
            You need to be logged in to follow this teacher.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={onLoginRedirect}
          >
            Go to Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
