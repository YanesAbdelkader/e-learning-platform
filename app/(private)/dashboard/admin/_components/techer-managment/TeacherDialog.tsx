"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Teacher } from "../../_lib/shemaTecher";
import { fetchTeacherInfo, verifyTeacher } from "../../_actions/teacherActions";
import Image from "next/image";
import { ChevronRight, Loader2 } from "lucide-react";

interface TeacherDialogProps {
  teacherId: string;
  refreshTeachers: () => Promise<void>;
}

export default function TeacherDialog({
  teacherId,
  refreshTeachers,
}: TeacherDialogProps) {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const loadTeacherInfo = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTeacherInfo(String(teacherId));
      if (data) {
        setTeacher({
          id: data.id,
          name: data.info.name,
          lastname: data.info.lastname,
          picture: data.info.picture,
          email: data.info.email,
          role: data.info.role,
          status: data.info.teacher_info.verified ? "Active" : "Blocked",
          course_count: data.info.course_count ?? 0,
          teacher_info: {
            id: data.info.teacher_info.id,
            user_id: data.info.teacher_info.user_id,
            subjects: data.info.teacher_info.subjects,
            rating: data.info.teacher_info.rating,
            contactinfo: data.info.teacher_info.contactinfo,
            certifications: data.info.teacher_info.certifications,
            education: data.info.teacher_info.education,
            links: data.info.teacher_info.links,
            bio: data.info.teacher_info.bio,
            verified: data.info.teacher_info.verified,
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to load teacher information.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  useEffect(() => {
    if (open) {
      loadTeacherInfo();
    }
  }, [open, loadTeacherInfo]);

  const handleVerify = async (status: boolean) => {
    setLoading(true);
    try {
      const result = await verifyTeacher(String(teacherId), status);
      if (result?.success) {
        toast({
          title: "Success",
          description: "Teacher verification updated.",
        });
        await refreshTeachers();
        setOpen(false);
      } else {
        toast({
          title: "Error",
          description: result?.error || "Failed to update verification status.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Manage <ChevronRight />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Teacher</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        ) : teacher ? (
          <div className="space-y-3">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${teacher.picture}`}
              alt={`${teacher.name} ${teacher.lastname}`}
              className="rounded-full mx-auto"
              width={50}
              height={50}
              onError={(e) => {
                e.currentTarget.src = "/default-profile.png"; // Fallback image
              }}
            />
            <h2 className="text-lg font-semibold text-center">
              {teacher.name} {teacher.lastname}
            </h2>
            <p className="text-sm text-gray-500 text-center">{teacher.email}</p>
            <p>
              <strong>Subjects:</strong>{" "}
              {teacher.teacher_info?.subjects.join(", ")}
            </p>
            <p>
              <strong>Education:</strong> {teacher.teacher_info?.education}
            </p>
            <p>
              <strong>Bio:</strong> {teacher.teacher_info?.bio}
            </p>
            <p>
              <strong>Certifications:</strong>
            </p>
            <ul className="list-disc pl-4">
              {teacher.teacher_info?.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
            <p>
              <strong>Links:</strong>
            </p>
            <ul className="list-disc pl-4">
              {teacher.teacher_info?.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Failed to load teacher info.</p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          {teacher?.teacher_info && (
            <Button
              variant={
                teacher.teacher_info.verified ? "destructive" : "default"
              }
              onClick={() => handleVerify(!teacher.teacher_info.verified)}
              disabled={loading}
            >
              {teacher.teacher_info.verified ? "Reject" : "Approve"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
