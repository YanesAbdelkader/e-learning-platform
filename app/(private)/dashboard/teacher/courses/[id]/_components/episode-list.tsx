"use client"

import { Droppable, DragDropContext, type DropResult } from "@hello-pangea/dnd"
import { EpisodeItem } from "./episode-item"
import type { Episode } from "./types"

interface EpisodeListProps {
  episodes: Episode[]
  onEdit: (episode: Episode) => void
  onDelete: (id: string) => void
  onDragEnd: (result: DropResult) => void
}

export function EpisodeList({ episodes, onEdit, onDelete, onDragEnd }: EpisodeListProps) {
  const sortedEpisodes = [...episodes].sort((a, b) => a.order - b.order)

  if (episodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg border-border bg-muted/20">
        <p className="text-lg font-medium text-muted-foreground">No episodes found</p>
        <p className="text-sm text-muted-foreground">Add your first episode to get started.</p>
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="episodes">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {sortedEpisodes.map((episode, index) => (
              <EpisodeItem key={episode.id} episode={episode} index={index} onEdit={onEdit} onDelete={onDelete} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

