"use client"

import type React from "react"
import { useRef, useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { uploadFileChunks } from "@/app/(private)/dashboard/teacher/courses/[id]/_actions/use-episodes"

type UploadStage = "idle" | "preparing" | "uploading" | "processing" | "complete"

interface UseVideoUploadOptions {
  onUploadComplete?: (fileUrl: string) => void
  maxFileSize?: number // in bytes
}

export function useVideoUpload({
  onUploadComplete,
  maxFileSize = 2 * 1024 * 1024 * 1024, // 2GB default
}: UseVideoUploadOptions = {}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [hasFile, setHasFile] = useState(false)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [fileInfo, setFileInfo] = useState<{
    name: string
    size: string
  } | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadStage, setUploadStage] = useState<UploadStage>("idle")

  const { toast } = useToast()

  // Trigger file input click
  const triggerFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  // Handle file selection
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (!selectedFile) return

      // Check file size
      if (selectedFile.size > maxFileSize) {
        toast({
          title: "File too large",
          description: `Maximum file size is ${maxFileSize / (1024 * 1024 * 1024)}GB`,
          variant: "destructive",
        })
        return
      }

      // Check file type
      const validTypes = [".mp4", ".mov", ".avi", ".ts"]
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase()
      if (!fileExtension || !validTypes.includes(`.${fileExtension}`)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file (MP4, MOV, AVI, TS)",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
      setHasFile(true)
      setUploadError(null)
      setUploadStage("idle")
      setUploadProgress(0)

      // Store file info for display
      const fileSizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2)
      setFileInfo({
        name: selectedFile.name,
        size: `${fileSizeMB} MB`,
      })

      // Generate a preview URL for the video
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setVideoPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(selectedFile)
    },
    [maxFileSize, toast],
  )

  // Handle file deselection
  const handleDeselectVideo = useCallback(() => {
    setFile(null)
    setHasFile(false)
    setVideoPreview(null)
    setFileInfo(null)
    setUploadProgress(0)
    setUploadError(null)
    setUploadStage("idle")

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  // Upload video with chunked upload
  const uploadVideo = useCallback(
    async (title: string, description: string, courseId: string) => {
      if (!file) {
        toast({
          title: "No file selected",
          description: "Please select a video file to upload",
          variant: "destructive",
        })
        return
      }

      const chunkSize = 5 * 1024 * 1024 // 5MB chunks 
      const totalChunks = Math.ceil(file.size / chunkSize)
      const totalSize = (file.size / (1024 * 1024)).toFixed(2) // Size in MB

      setUploadProgress(0)
      setUploadError(null)
      setUploadStage("preparing")

      toast({
        title: "Preparing Upload",
        description: `Preparing to upload ${file.name} (${totalSize} MB)`,
      })

      try {
        setUploadStage("uploading")
        let fileUrl = ""

        for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
          const start = chunkNumber * chunkSize
          const end = Math.min(start + chunkSize, file.size)
          const chunk = file.slice(start, end)

          const chunkFormData = new FormData()
          chunkFormData.append("file", chunk)
          chunkFormData.append("course_id", courseId)
          chunkFormData.append("title", title)
          chunkFormData.append("description", description)
          chunkFormData.append("filename", file.name)
          chunkFormData.append("chunk_number", chunkNumber.toString())
          chunkFormData.append("total_chunks", totalChunks.toString())

          console.log(`Uploading chunk ${chunkNumber + 1} of ${totalChunks}`)

          const response = await uploadFileChunks(chunkFormData)

          // Check if this is the final chunk
          if (chunkNumber + 1 === totalChunks) {
            if (!response.file) {
              throw new Error("No file URL returned from the backend")
            }

            fileUrl = response.file
            setUploadStage("complete")

            toast({
              title: "Upload Complete",
              description: "Your video has been uploaded successfully!",
            })

            if (onUploadComplete) {
              onUploadComplete(fileUrl)
            }
          } else {
            const newProgress = Math.floor(((chunkNumber + 1) / totalChunks) * 100)
            setUploadProgress(newProgress)
          }
        }

        return fileUrl
      } catch (error) {
        console.error("Upload failed:", error)
        const errorMessage = error instanceof Error ? error.message : String(error)
        setUploadError(`Upload failed: ${errorMessage}`)

        toast({
          title: "Upload Failed",
          description: `Upload failed: ${errorMessage}`,
          variant: "destructive",
        })

        setUploadStage("idle")
        throw error
      }
    },
    [file, toast, onUploadComplete],
  )

  return {
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
  }
}