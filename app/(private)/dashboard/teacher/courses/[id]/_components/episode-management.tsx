"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Episode } from "./types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import Loading from "@/app/(public)/loading";
import {
  deleteEpisode,
  fetchEpisodes,
  reorderEpisodes,
} from "../_actions/use-episodes";
import { EpisodeList } from "./episode-list";
import Link from "next/link";
import { EpisodeForm } from "./episode-form";

export default function EpisodeManagement() {
  const params = useParams();
  const courseId = params.id as string;
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setCurrentEpisode] = useState<Episode | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Reusable function to load episodes
  const loadEpisodes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchEpisodes(courseId);
      setEpisodes(result);
    } catch (err) {
      console.log(err);
      setError("Failed to load episodes.");
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadEpisodes();
  }, [loadEpisodes]);

  const handleAddEpisode = () => {
    setCurrentEpisode(null);
    setIsDialogOpen(true);
  };

  const handleEditEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setIsDialogOpen(true);
  };

  const handleDeleteEpisode = async (id: string) => {
    try {
      await deleteEpisode({ id, courseId });
      await loadEpisodes();
      toast({
        title: "Episode deleted",
        description: "The episode has been successfully deleted.",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Failed to delete the episode. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedEpisodes = [...episodes];
    const [movedEpisode] = reorderedEpisodes.splice(result.source.index, 1);
    reorderedEpisodes.splice(result.destination.index, 0, movedEpisode);

    const updatedEpisodes = reorderedEpisodes.map((ep, idx) => ({
      ...ep,
      order: idx + 1,
    }));

    setEpisodes(updatedEpisodes);
    try {
      const result = await reorderEpisodes(updatedEpisodes, courseId);
      if (result) {
        toast({
          title: "Success",
          description: "Reordered episode successfully",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Failed to reorder episodes. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto">
      <Link
        href="/dashboard/teacher/courses"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Courses
      </Link>
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
        <DialogContent className="sm:max-w-[800px]">
          <EpisodeForm
            courseId={courseId} // Pass the current episode for editing
            onSuccess={() => {
              setIsDialogOpen(false);
              loadEpisodes(); // Reload episodes after successful addition/update
            }}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
