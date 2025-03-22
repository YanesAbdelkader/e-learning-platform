import { Badge } from "@/components/ui/badge";
import { Episode } from "../../_lib/type";

export function Curriculum({ episodes }: { episodes: Episode[] }) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        Course Curriculum
      </h2>
      <div className="space-y-3">
        {episodes.map((episode, index) => (
          <div
            key={episode.id}
            className={`p-4 border rounded-lg flex justify-between items-center ${
              episode.completed ? "bg-muted/30" : "bg-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                {index + 1}
              </div>
              <div>
                <h3 className="font-medium">{episode.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {episode.duration}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {episode.completed ? (
                <Badge variant="outline" className="bg-primary/10">
                  Completed
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-primary/10">
                  not watched
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
