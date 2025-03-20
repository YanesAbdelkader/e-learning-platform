"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, FileVideo, Loader2, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useVideoUpload } from "@/hooks/use-video-upload"

interface EpisodeFormProps {
  onCancel: () => void
  courseId: string
  onSuccess?: (episodeData: {
    id: string
    title: string
    video: string
  }) => void
}

export function EpisodeForm({ onCancel, courseId, onSuccess }: EpisodeFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  // Form validation
  const [errors, setErrors] = useState<{
    title?: string
  }>({})

  // Use our custom hook for video upload functionality
  const {
    fileInputRef,
    fileInfo,
    videoPreview,
    hasFile,
    uploadProgress,
    uploadStage,
    uploadError,
    handleFileSelect,
    handleDeselectVideo,
    triggerFileInput,
    uploadVideo,
  } = useVideoUpload({
    onUploadComplete: (fileUrl) => {
      if (onSuccess) {
        onSuccess({
          id: courseId,
          title: formData.title,
          video: fileUrl,
        })
      }
      onCancel()
    },
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear validation errors when user types
    if (name === "title" && errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }))
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    const newErrors: { title?: string } = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (!hasFile) {
      toast({
        title: "Missing video",
        description: "Please select a video file to upload",
        variant: "destructive",
      })
      return
    }

    // Start upload
    await uploadVideo(formData.title, formData.description, courseId)
  }

  // Get upload status text based on current stage
  const getUploadStatusText = () => {
    switch (uploadStage) {
      case "preparing":
        return "Preparing upload..."
      case "uploading":
        return `Uploading: ${uploadProgress}%`
      case "processing":
        return "Processing video..."
      case "complete":
        return "Upload complete!"
      default:
        return ""
    }
  }

  // Get appropriate icon for current upload stage
  const getUploadStatusIcon = () => {
    switch (uploadStage) {
      case "preparing":
      case "uploading":
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return <FileVideo className="h-4 w-4 text-primary" />
    }
  }

  const isUploading = uploadStage !== "idle" && uploadStage !== "complete"

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Add New Episode</CardTitle>
        <CardDescription>Upload a video file and provide details for this episode</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="Episode upload form">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="font-medium">
                Episode Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a descriptive title for this episode"
                className={cn("h-10", errors.title && "border-destructive")}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
                required
              />
              {errors.title && (
                <p id="title-error" className="text-sm text-destructive mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what viewers will learn in this episode"
                className="min-h-[100px] resize-y"
              />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label className="font-medium">
                  Video File <span className="text-destructive">*</span>
                </Label>
                <span className="text-xs text-muted-foreground">Supported formats: MP4, MOV, AVI, TS (max 2GB)</span>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp4,.mov,.avi,.ts"
                className="hidden"
                onChange={handleFileSelect}
                aria-label="Upload video file"
              />

              {!hasFile ? (
                <div
                  className={cn(
                    "rounded-lg border-2 border-dashed p-6 transition-colors flex flex-col items-center justify-center gap-3",
                    "border-muted-foreground/20 hover:border-primary/30 hover:bg-primary/5 cursor-pointer",
                  )}
                  onClick={triggerFileInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      triggerFileInput()
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label="Upload video file"
                >
                  <div className="bg-primary/10 rounded-full p-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Drag & drop your video file here</p>
                    <p className="text-sm text-muted-foreground mt-1">or click to browse files</p>
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
                        <p className="font-medium text-sm truncate max-w-[150px] md:max-w-[200px]">{fileInfo?.name}</p>
                        <p className="text-xs text-muted-foreground">{fileInfo?.size}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                      onClick={handleDeselectVideo}
                      aria-label="Remove selected video"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Video preview */}
                  {videoPreview && (
                    <div className="relative rounded-md overflow-hidden border bg-black/5">
                      <video controls className="w-full h-auto max-h-[240px] mx-auto" aria-label="Video preview">
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
                      <span className="font-medium">{getUploadStatusText()}</span>
                    </div>
                    <span className={cn("font-medium", uploadStage === "complete" ? "text-green-500" : "text-primary")}>
                      {uploadProgress}%
                    </span>
                  </div>

                  <Progress
                    value={uploadProgress}
                    className={cn("h-2 w-full", uploadStage === "complete" ? "bg-green-100" : "bg-primary/20")}
                    aria-label={`Upload progress: ${uploadProgress}%`}
                  />
                </div>
              )}

              {uploadError && (
                <div
                  className="flex items-center gap-2 text-sm text-destructive mt-2 p-3 bg-destructive/10 rounded-md"
                  role="alert"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p>{uploadError}</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-6 gap-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isUploading} className="min-w-[100px]">
          Cancel
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!formData.title || !hasFile || isUploading}
          className="gap-2 min-w-[140px]"
          variant={uploadStage === "complete" ? "outline" : "default"}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{uploadStage === "preparing" ? "Preparing" : "Uploading"}</span>
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
  )
}

