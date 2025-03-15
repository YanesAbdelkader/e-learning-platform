"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { StepProps } from "../_components/signup-types"
import { useToast } from "@/hooks/use-toast"
import ImageCropper from "../_components/image-cropper"
import Image from "next/image"

export default function ProfilePictureStep({ formData, updateFormData }: StepProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [showCropper, setShowCropper] = useState(false)
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target) {
          setImageSrc(event.target.result as string)
          setShowCropper(true)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const handleCroppedImage = (croppedImage: string) => {
    updateFormData({ picture: croppedImage })
    setShowCropper(false)
    toast({
      title: "Profile picture saved",
      description: "Your profile picture has been successfully saved.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Profile Picture</Label>
        <div className="flex flex-col items-center space-y-4">
          {formData.picture ? (
            <div className="relative">
              <Image
                src={formData.picture || "/placeholder.svg"}
                alt="Profile Preview"
                className="rounded-full object-cover border-2 border-primary"
                width={40}
                height={40}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 rounded-full h-8 w-8"
                onClick={() => updateFormData({ picture: "" })}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}

          {!showCropper && (
            <div className="flex flex-col items-center">
              <Label
                htmlFor="picture-upload"
                className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
              >
                {formData.picture ? "Change Picture" : "Upload Picture"}
              </Label>
              <Input id="picture-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <p className="text-sm text-muted-foreground mt-2">Upload a clear photo of yourself</p>
            </div>
          )}
        </div>
      </div>

      {showCropper && imageSrc && (
        <ImageCropper
          imageSrc={imageSrc}
          onCropComplete={handleCroppedImage}
          onCancel={() => {
            setShowCropper(false)
            setImageSrc(null)
          }}
        />
      )}
    </div>
  )
}

