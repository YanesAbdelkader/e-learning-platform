"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface DeleteCourseAlertProps {
  courseId: string;
  onDelete: (courseId: string) => Promise<void>;
}

export default function DeleteCourseAlert({
  courseId,
  onDelete,
}: DeleteCourseAlertProps) {
  const [open, setOpen] = useState(false);

  const handleConfirmDelete = async () => {
    await onDelete(courseId);
    setOpen(false);
  };

  return (
    <>
      <DropdownMenuItem
        onClick={() => setOpen(true)}
        className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
        onSelect={(e) => e.preventDefault()}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </DropdownMenuItem>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              course and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
