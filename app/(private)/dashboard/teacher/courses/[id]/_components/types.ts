export interface Episode {
  id: string;
  title: string;
  description: string;
  video: string;
  duration: string;
  order: number;
  status: boolean;
}

export type NewEpisode = Omit<Episode, "id" | "order">;

export interface EpisodeActions {
  addEpisode: (episode: NewEpisode) => Promise<Episode>;
  updateEpisode: (episode: Episode) => Promise<void>;
  deleteEpisode: (id: string) => Promise<void>;
  reorderEpisodes: (episodes: Episode[]) => Promise<void>;
}
