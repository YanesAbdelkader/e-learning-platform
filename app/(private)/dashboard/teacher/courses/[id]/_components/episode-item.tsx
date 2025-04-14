import { Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Edit,
  Grip,
  Loader,
  MoreVertical,
  Trash,
  Video,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Episode } from "./types";

interface EpisodeItemProps {
  episode: Episode;
  index: number;
  onEdit: (episode: Episode) => void;
  onDelete: (id: string) => void;
}

export function EpisodeItem({
  episode,
  index,
  onEdit,
  onDelete,
}: EpisodeItemProps) {
  return (
    <Draggable draggableId={String(episode.id)} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="border border-border"
        >
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <div {...provided.dragHandleProps} className="mr-3 cursor-grab">
                <Grip className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <span className="bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                    {episode.order}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{episode.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {episode.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-4">
                <div className="flex items-center text-muted-foreground">
                  {episode.status ? (
                    <>
                      <Video className="h-4 w-4 mr-1" />
                      <span className="text-sm">Video uploaded</span>
                    </>
                  ) : (
                    <>
                      <Loader className="h-4 w-4 mr-1" />
                      <span className="text-sm">Transcoding</span>
                    </>
                  )}
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{episode.duration || "00:00"}</span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(episode)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(episode.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
