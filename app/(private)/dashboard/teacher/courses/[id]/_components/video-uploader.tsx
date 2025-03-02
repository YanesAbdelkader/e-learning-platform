"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Upload, Video } from "lucide-react"

interface VideoUploaderProps {
  currentVideo: string
  currentDuration: string
  onVideoUploaded: (videoUrl: string, duration: string) => void
}

export function VideoUploader({ currentVideo, currentDuration, onVideoUploaded }: VideoUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return

    const file = e.target.files[0]
    setIsUploading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Simulate getting duration from API after upload
          const fakeDuration = `${Math.floor(Math.random() * 30)}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`

          // Call the callback with the new video URL and duration
          onVideoUploaded(URL.createObjectURL(file), fakeDuration)

          return 0
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input id="video-upload" type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("video-upload")?.click()}
          className="w-full justify-start"
          disabled={isUploading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {currentVideo ? "Change video file" : "Upload video file"}
        </Button>
      </div>

      {isUploading && (
        <div className="mt-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Uploading: {uploadProgress}%</p>
        </div>
      )}

      {currentVideo && !isUploading && (
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Video className="h-4 w-4 mr-1" />
          <span>Video uploaded</span>
          {currentDuration && (
            <span className="ml-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {currentDuration}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

