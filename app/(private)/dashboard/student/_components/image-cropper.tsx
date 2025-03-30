"use client"

import { useState, useRef, useCallback } from "react"
import ReactCrop, { type Crop } from "react-image-crop"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import "react-image-crop/dist/ReactCrop.css"
import { toast } from "@/hooks/use-toast"

interface ImageCropperProps {
  open: boolean
  onClose: () => void
  onCropComplete: (croppedImage: string) => void
  imageUrl: string
}

export default function ImageCropper({ open, onClose, onCropComplete, imageUrl }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  })
  const imageRef = useRef<HTMLImageElement | null>(null)

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    imageRef.current = img
    // Make the crop a circle by default
    const minSize = Math.min(img.width, img.height)
    const size = minSize * 0.9
    setCrop({
      unit: "px",
      width: size,
      height: size,
      x: (img.width - size) / 2,
      y: (img.height - size) / 2,
    })
    return false
  }, [])

  const getCroppedImg = useCallback(() => {
    if (!imageRef.current) {
      toast({
        title: "Error",
        description: "Image reference not found",
        variant: "destructive",
      })
      return
    }

    try {
      const image = imageRef.current
      const canvas = document.createElement("canvas")
      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height

      canvas.width = crop.width
      canvas.height = crop.height

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        toast({
          title: "Error",
          description: "Could not get canvas context",
          variant: "destructive",
        })
        return
      }

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      )

      // Convert to base64
      const base64Image = canvas.toDataURL("image/jpeg")
      onCropComplete(base64Image)
      toast({
        title: "Success",
        description: "Image cropped successfully",
      })
      onClose()
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to crop image",
        variant: "destructive",
      })
    }
  }, [crop, onCropComplete, onClose])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="mt-4 overflow-hidden">
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => setCrop(c)} aspect={1} circularCrop>
            <img
              src={imageUrl || "/placeholder.svg"}
              onLoad={(e) => onImageLoad(e.currentTarget)}
              alt="Crop me"
              className="max-h-[400px] w-auto"
            />
          </ReactCrop>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={getCroppedImg}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

