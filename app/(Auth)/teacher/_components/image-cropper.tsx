"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Crop, ZoomIn, ZoomOut, RotateCw } from "lucide-react"

interface ImageCropperProps {
  imageSrc: string
  onCropComplete: (croppedImage: string) => void
  onCancel: () => void
}

export default function ImageCropper({ imageSrc, onCropComplete, onCancel }: ImageCropperProps) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const drawImage = useCallback(() => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Save context
    ctx.save();
    // Translate to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // Rotate
    ctx.rotate((rotation * Math.PI) / 180);
    // Scale
    ctx.scale(scale, scale);
    // Draw image centered
    ctx.drawImage(imageRef.current, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    // Restore context
    ctx.restore();
  }, [scale, rotation]);

  useEffect(() => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      imageRef.current = image;
      drawImage();
    };
    image.onerror = (error) => {
      console.log("Failed to load image", error);
    };
  }, [imageSrc, drawImage]);

  useEffect(() => {
    drawImage();
  }, [scale, rotation, drawImage]);

  const handleCrop = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const croppedImage = canvas.toDataURL("image/jpeg");
    onCropComplete(croppedImage);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium">Crop Your Profile Picture</h3>
          <p className="text-sm text-muted-foreground">Adjust, rotate, and crop your image</p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-64 h-64 overflow-hidden rounded-full border-2 border-primary">
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center">
                <ZoomOut className="h-4 w-4 mr-2" />
                Zoom
                <ZoomIn className="h-4 w-4 ml-2" />
              </Label>
              <span className="text-sm">{Math.round(scale * 100)}%</span>
            </div>
            <Slider
              value={[scale * 100]}
              min={50}
              max={200}
              step={1}
              onValueChange={(value) => setScale(value[0] / 100)}
            />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleRotate}>
              <RotateCw className="h-4 w-4 mr-2" />
              Rotate
            </Button>
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="button" onClick={handleCrop}>
                <Crop className="h-4 w-4 mr-2" />
                Crop & Save
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}