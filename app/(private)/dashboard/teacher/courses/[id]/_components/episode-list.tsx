import { Droppable, DragDropContext, type DropResult } from "@hello-pangea/dnd"
import { EpisodeItem } from "./episode-item"
import { Episode } from "./types"

interface EpisodeListProps {
  episodes: Episode[]
  onEdit: (episode: Episode) => void
  onDelete: (id: string) => void
  onDragEnd: (result: DropResult) => void
}

export function EpisodeList({ episodes, onEdit, onDelete, onDragEnd }: EpisodeListProps) {
  const sortedEpisodes = [...episodes].sort((a, b) => a.order - b.order)

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

