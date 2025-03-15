"use client";

import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useEffect } from "react";
import Resumable from "resumablejs";

export default function Uploader({ setFormData, courseId, formData }: { setFormData: unknown; courseId: string; formData: FormData }) {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const uploadRef = useRef<Resumable | null>(null);

  useEffect(() => {
    initializeUploader();
  }, []);

  const triggerFileSelect = () => {
    document.getElementById("browse")?.click();
  };

  const initializeUploader = () => {
    if (uploadRef.current) return;

    const uploader = new Resumable({
      target: `/api/upload-chunk", 
      chunkSize: 2 * 1024 * 1024, // 2MB
      fileType: ["mp4", "mov", "avi", "ts"],
      forceChunkSize: true,
      testChunks: false,
      method: "octet",
      headers: {
        "X-CSRF-TOKEN": "your-csrf-token", 
      },
      query: (file: { fileName: unknown; size: number; }) => ({
        filename: file.fileName,
        totalChunks: Math.ceil(file.size / (2 * 1024 * 1024)),
        title: formData.get("title"),
        description: formData.get("description"),
        course_id: courseId,
      }),
    });

    uploader.assignBrowse(document.getElementById("browse")!, true);

    uploader.on("fileAdded", (file) => {
      setUploading(true);
      setUploadProgress(0);
      toast({
        title: "Uploading started",
        description: `Uploading: ${file.fileName}`,
      });

      if (!uploader.isUploading()) {
        uploader.upload();
      }
    });

    uploader.on("fileProgress", (file) => {
      setUploadProgress(Math.floor(file.progress(true) * 100));
    });

    uploader.on("fileSuccess", (file) => {
      toast({
        title: "Upload Complete",
        description: "Your video has been successfully uploaded.",
      });
      setUploading(false);
      setFormData((prev: any) => ({ ...prev, video: file.fileName }));
    });

    uploader.on("fileError", (_, message) => {
      setUploadError(`Upload failed: ${message || "Unknown error"}`);
      toast({
        title: "Upload failed",
        description: message || "Unknown error",
        variant: "destructive",
      });
      setUploading(false);
    });

    uploadRef.current = uploader;
  };

  return (
    <div>
      <input
        id="browse"
        type="file"
        className="hidden"
        accept="video/mp4,video/mov,video/avi,video/ts"
      />

      <div
        className="flex flex-col items-center justify-center border border-dashed rounded-md p-6 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={triggerFileSelect}
      >
        <p className="text-sm font-medium">Click to select a video file</p>
        <p className="text-xs text-muted-foreground mt-1">MP4, MOV, AVI or TS</p>
      </div>

      {uploading && (
        <div className="mt-4 p-4 border rounded-md bg-background">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Uploading video...</span>
            <span className="font-medium">{uploadProgress}%</span>
          </div>
        </div>
      )}

      {uploadError && (
        <div className="mt-2 p-3 border border-red-200 rounded-md bg-red-50 text-red-800">
          <p className="font-medium">Upload Error</p>
          <p className="text-sm">{uploadError}</p>
        </div>
      )}
    </div>
  );
}