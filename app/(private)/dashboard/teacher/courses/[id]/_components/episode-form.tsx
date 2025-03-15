"use client";

import { useEffect, useRef, useState } from "react";
import { Dashboard } from "@uppy/react";
import Uppy from "@uppy/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle2,
  FileVideo,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { uploadFileChunks } from "../_actions/use-episodes";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface EpisodeFormProps {
  onCancel: () => void;
  courseId: string;
  onSuccess?: (episodeData: {
    id: string;
    title: string;
    video: string;
  }) => void;
}

export function EpisodeForm({
  onCancel,
  courseId,
  onSuccess,
}: EpisodeFormProps) {
  const uppyRef = useRef<Uppy | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadStage, setUploadStage] = useState<
    "idle" | "preparing" | "uploading" | "processing" | "complete"
  >("idle");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [hasFile, setHasFile] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (!uppyRef.current) {
      const uppy = new Uppy({
        restrictions: {
          maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB max
          allowedFileTypes: [".mp4", ".mov", ".avi", ".ts"],
        },
        autoProceed: false,
      });

      uppy.on("file-added", (file) => {
        setUploadError(null);
        setHasFile(true);

        // Store file info for display
        const fileSizeMB = ((file.size ?? 0) / (1024 * 1024)).toFixed(2);
        const fileName = file.name ?? "Unknown file";
        setFileInfo({
          name: fileName,
          size: `${fileSizeMB} MB`,
        });

        // Generate a preview URL for the video
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setVideoPreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(file.data);
      });

      uppy.on("file-removed", () => {
        setHasFile(false);
        setVideoPreview(null);
        setFileInfo(null);
      });

      uppyRef.current = uppy;
    }

    return () => {
      uppyRef.current?.destroy();
    };
  }, []);

  const handleDeselectVideo = () => {
    if (uppyRef.current) {
      const files = uppyRef.current.getFiles();
      if (files.length > 0) {
        uppyRef.current.removeFile(files[0].id); // Remove the file from Uppy
      }
      setHasFile(false);
      setVideoPreview(null);
      setFileInfo(null);
    }
  };

  const handleUpload = async () => {
    if (!uppyRef.current) return;

    const files = uppyRef.current.getFiles();
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please add a video file",
        variant: "destructive",
      });
      return;
    }

    const file = files[0];
    const title = formData.title.trim();
    const description = formData.description.trim();
    const filename = file.name ?? "unknown_file";
    const chunkSize = 5 * 1024 * 1024; // 5MB chunks
    const totalChunks = Math.ceil((file.size ?? 0) / chunkSize);
    const totalSize = ((file.size ?? 0) / (1024 * 1024)).toFixed(2); // Size in MB

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    setUploadStage("preparing");

    toast({
      title: "Preparing Upload",
      description: `Preparing to upload ${filename} (${totalSize} MB)`,
    });

    try {
      setUploadStage("uploading");

      for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
        const start = chunkNumber * chunkSize;
        const end = Math.min(start + chunkSize, file.size ?? 0);
        const chunk = file.data.slice(start, end);

        const chunkFormData = new FormData();
        chunkFormData.append("file", chunk);
        chunkFormData.append("course_id", courseId); // Match backend field name
        chunkFormData.append("title", title);
        chunkFormData.append("description", description);
        chunkFormData.append("filename", filename);
        chunkFormData.append("chunk_number", chunkNumber.toString()); // Start from 0
        chunkFormData.append("total_chunks", totalChunks.toString());

        const response = await uploadFileChunks(chunkFormData);

        // Check if this is the final chunk
        if (chunkNumber + 1 === totalChunks) {
          if (!response.file) {
            throw new Error("No file URL returned from the backend");
          }

          setFormData((prev) => ({
            ...prev,
            video: response.file,
          }));

          setUploadStage("complete");
          toast({
            title: "Upload Complete",
            description: "Your video has been uploaded successfully!",
          });

          // Revalidate the path to refresh the data
          onCancel();

          if (onSuccess) {
            onSuccess({
              id: courseId,
              title: formData.title,
              video: response.file,
            });
          }
        } else {
          const newProgress = Math.floor(
            ((chunkNumber + 1) / totalChunks) * 100
          );
          setUploadProgress(newProgress);

          if (chunkNumber % 5 === 0 || chunkNumber === totalChunks - 1) {
            toast({
              title: "Upload Progress",
              description: `Uploading: ${newProgress}% complete`,
            });
          }
        }
      }
    } catch (error) {
      setUploadError(
        `Upload failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      toast({
        title: "Upload Failed",
        description: `Upload failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
        variant: "destructive",
      });
      setUploadStage("idle");
    } finally {
      setUploading(false);
    }
  };

  const getUploadStatusText = () => {
    switch (uploadStage) {
      case "preparing":
        return "Preparing upload...";
      case "uploading":
        return `Uploading: ${uploadProgress}%`;
      case "processing":
        return "Processing video...";
      case "complete":
        return "Upload complete!";
      default:
        return "";
    }
  };

  const getUploadStatusIcon = () => {
    switch (uploadStage) {
      case "preparing":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case "uploading":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <FileVideo className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Add New Episode</CardTitle>
        <CardDescription>
          Upload a video file and provide details for this episode
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="font-medium">
                Episode Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter a descriptive title for this episode"
                className="h-10"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe what viewers will learn in this episode"
                className="min-h-[100px] resize-y"
              />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label className="font-medium">
                  Video File <span className="text-destructive">*</span>
                </Label>
                <span className="text-xs text-muted-foreground">
                  Supported formats: MP4, MOV, AVI, TS (max 2GB)
                </span>
              </div>

              {!hasFile ? (
                <div
                  className={cn(
                    "rounded-lg border-2 border-dashed p-6 transition-colors flex flex-col items-center justify-center gap-3",
                    "border-muted-foreground/20 hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
                  )}
                  onClick={() => {
                    const dashboardEl = document.querySelector(
                      ".uppy-Dashboard-input"
                    );
                    if (dashboardEl instanceof HTMLElement) {
                      dashboardEl.click();
                    }
                  }}
                >
                  <div className="bg-primary/10 rounded-full p-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">
                      Drag & drop your video file here
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      or click to browse files
                    </p>
                  </div>

                  {/* Hidden Uppy Dashboard */}
                  <div className="hidden">
                    {uppyRef.current && (
                      <Dashboard
                        uppy={uppyRef.current}
                        width="100%"
                        height="1px"
                        proudlyDisplayPoweredByUppy={false}
                        showProgressDetails
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border p-4 bg-primary/5 space-y-4">
                  {/* File info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-full p-2">
                        <FileVideo className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm truncate max-w-[200px] md:max-w-[300px]">
                          {fileInfo?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {fileInfo?.size}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                      onClick={handleDeselectVideo}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Video preview */}
                  {videoPreview && (
                    <div className="relative rounded-md overflow-hidden border bg-black/5">
                      <video
                        controls
                        className="w-full h-auto max-h-[240px] mx-auto"
                      >
                        <source src={videoPreview} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              )}

              {uploadStage !== "idle" && (
                <div className="space-y-2 mt-2 bg-background p-3 rounded-md border">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {getUploadStatusIcon()}
                      <span className="font-medium">
                        {getUploadStatusText()}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "font-medium",
                        uploadStage === "complete"
                          ? "text-green-500"
                          : "text-primary"
                      )}
                    >
                      {uploadProgress}%
                    </span>
                  </div>

                  <Progress
                    value={uploadProgress}
                    className={cn(
                      "h-2 w-full",
                      uploadStage === "complete"
                        ? "bg-green-100"
                        : "bg-primary/20"
                    )}
                  />
                </div>
              )}

              {uploadError && (
                <div className="flex items-center gap-2 text-sm text-destructive mt-2 p-3 bg-destructive/10 rounded-md">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p>{uploadError}</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-6 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={uploading}
          className="min-w-[100px]"
        >
          Cancel
        </Button>

        <Button
          type="button"
          onClick={handleUpload}
          disabled={!formData.title || !hasFile || uploading}
          className="gap-2 min-w-[140px]"
          variant={uploadStage === "complete" ? "outline" : "default"}
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>
                {uploadStage === "preparing" ? "Preparing" : "Uploading"}
              </span>
            </>
          ) : uploadStage === "complete" ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Uploaded
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload & Save
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
