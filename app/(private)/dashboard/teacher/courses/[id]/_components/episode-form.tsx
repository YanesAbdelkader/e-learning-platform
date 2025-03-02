import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Episode } from "./types"
import { VideoUploader } from "./video-uploader"

interface EpisodeFormProps {
  episode: Episode | null
  onSave: (episode: Omit<Episode, "id" | "order">) => void
  onCancel: () => void
}

export function EpisodeForm({ episode, onSave, onCancel }: EpisodeFormProps) {
  const [formData, setFormData] = useState<Omit<Episode, "id" | "order">>(
    episode
      ? {
          title: episode.title,
          description: episode.description,
          video: episode.video,
          duration: episode.duration,
        }
      : {
          title: "",
          description: "",
          video: "",
          duration: "",
        },
  )

  const isEditing = Boolean(episode)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleVideoUploaded = (videoUrl: string, duration: string) => {
    setFormData({
      ...formData,
      video: videoUrl,
      duration: duration,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Episode" : "Add New Episode"}</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter episode title"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter episode description"
            rows={3}
          />
        </div>

        <div className="grid gap-2">
          <Label>Video</Label>
          <VideoUploader
            currentVideo={formData.video}
            currentDuration={formData.duration}
            onVideoUploaded={handleVideoUploaded}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!formData.title}>
          Save Episode
        </Button>
      </div>
    </form>
  )
}

