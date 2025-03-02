"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import type { DropResult } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { EpisodeList } from "./episode-list"
import { EpisodeForm } from "./episode-form"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useEpisodes } from "../_actions/use-episodes"
import type { Episode } from "./types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/hooks/use-toast"

export default function EpisodeManagement() {
  const params = useParams()
  const courseId = params.courseId as string

  const { episodes, isLoading, error, addEpisode, updateEpisode, deleteEpisode, reorderEpisodes } =
    useEpisodes(courseId)

  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddEpisode = () => {
    setCurrentEpisode(null)
    setIsDialogOpen(true)
  }

  const handleEditEpisode = (episode: Episode) => {
    setCurrentEpisode(episode)
    setIsDialogOpen(true)
  }

  const handleDeleteEpisode = async (id: string) => {
    try {
      await deleteEpisode(id)
      toast({
        title: "Episode deleted",
        description: "The episode has been successfully deleted.",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "Error",
        description: "Failed to delete the episode. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveEpisode = async (episodeData: Omit<Episode, "id" | "order">) => {
    try {
      if (currentEpisode) {
        const updatedEpisode = { ...currentEpisode, ...episodeData }
        await updateEpisode(updatedEpisode)
        toast({
          title: "Episode updated",
          description: "The episode has been successfully updated.",
        })
      } else {
        await addEpisode(episodeData)
        toast({
          title: "Episode added",
          description: "The episode has been successfully added.",
        })
      }
      setIsDialogOpen(false)
      setCurrentEpisode(null)
    } catch (err) {
      console.log(err)
      toast({
        title: "Error",
        description: "Failed to save the episode. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(episodes)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    try {
      await reorderEpisodes(items)
    } catch (err) {
      console.log(err)
      toast({
        title: "Error",
        description: "Failed to reorder episodes. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading episodes...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Episodes</h1>
        <Button onClick={handleAddEpisode}>
          <Plus className="mr-2 h-4 w-4" />
          Add Episode
        </Button>
      </div>

      <EpisodeList
        episodes={episodes}
        onEdit={handleEditEpisode}
        onDelete={handleDeleteEpisode}
        onDragEnd={handleDragEnd}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <EpisodeForm episode={currentEpisode} onSave={handleSaveEpisode} onCancel={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

