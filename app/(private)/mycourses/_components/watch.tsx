"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  ChevronLeft,
  Clock,
  Link,
  PlayCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import VideoPlayer from "./video-player";

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  completed?: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  episodes: Episode[];
  instructor: string;
  level: string;
}

interface VideoPageProps {
  token: string;
  course: Course;
}

export default function VideoPage({ token, course }: VideoPageProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize the selected episode when the course data is available
  useEffect(() => {
    if (course?.episodes?.length) {
      setIsLoading(false);
      // Try to find the first incomplete episode, otherwise use the first episode
      const firstIncompleteEpisode = course.episodes.find(
        (episode) => !episode.completed
      );
      setSelectedEpisode(firstIncompleteEpisode || course.episodes[0]);
    }
  }, [course]);

  // Memoize the progress calculation to avoid unnecessary recalculations
  const progress = useMemo(() => {
    if (!course?.episodes?.length) return 0;
    const completedEpisodes = course.episodes.filter(
      (episode) => episode.completed
    ).length;
    return Math.round((completedEpisodes / course.episodes.length) * 100);
  }, [course]);

  // Handle episode selection
  const handleEpisodeSelect = useCallback((episode: Episode) => {
    setSelectedEpisode(episode);
    // Scroll to the top of the page on mobile when selecting a new episode
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!course || !selectedEpisode) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-muted-foreground">Course not found</p>
        <Link
          href="/mycourses"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          <span>Back to My Courses</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player and Course Info */}
        <div className="lg:col-span-2 space-y-6">
          <CourseHeader course={course} />
          <VideoPlayerCard videoUrl={selectedEpisode.videoUrl} token={token} />
          <EpisodeDetails
            episode={selectedEpisode}
            courseLevel={course.level}
          />
        </div>

        {/* Course episodes */}
        <div className="lg:col-span-1">
          <CourseContent
            episodes={course.episodes}
            selectedEpisodeId={selectedEpisode.id}
            progress={progress}
            onEpisodeSelect={handleEpisodeSelect}
          />
        </div>
      </div>
    </div>
  );
}

// Component for the course header
function CourseHeader({ course }: { course: Course }) {
  return (
    <CardContent className="px-0 pt-0">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline">{course.level}</Badge>
        <span className="text-sm text-muted-foreground">
          Instructor: {course.instructor}
        </span>
      </div>
      <p className="text-muted-foreground">{course.description}</p>
    </CardContent>
  );
}

// Component for the video player
function VideoPlayerCard({
  videoUrl,
  token,
}: {
  videoUrl: string;
  token: string;
}) {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-black aspect-video rounded-lg overflow-hidden">
          <VideoPlayer video={videoUrl} token={token} />
        </div>
      </CardContent>
    </Card>
  );
}

// Component for the episode details
function EpisodeDetails({
  episode,
  courseLevel,
}: {
  episode: Episode;
  courseLevel: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl">{episode.title}</CardTitle>
            <p className="text-muted-foreground">{episode.description}</p>
            <CardDescription className="flex items-center mt-1">
              <Clock className="h-4 w-4 mr-1" />
              {episode.duration}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">{courseLevel}</Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

// Component for the course content sidebar
function CourseContent({
  episodes,
  selectedEpisodeId,
  progress,
  onEpisodeSelect,
}: {
  episodes: Episode[];
  selectedEpisodeId: string;
  progress: number;
  onEpisodeSelect: (episode: Episode) => void;
}) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Course Content</CardTitle>
        <div className="flex items-center gap-2">
          <Progress value={progress} className="h-2" />
          <span className="text-xs text-muted-foreground">
            {progress}% complete
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] lg:h-[calc(100vh-200px)]">
          <ul className="divide-y">
            {episodes.map((episode) => (
              <li
                key={episode.id}
                className={cn(
                  "hover:bg-muted/50 transition-colors cursor-pointer",
                  selectedEpisodeId === episode.id && "bg-muted"
                )}
                onClick={() => onEpisodeSelect(episode)}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {episode.completed ? (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-primary-foreground" />
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "h-5 w-5 rounded-full border flex items-center justify-center",
                            selectedEpisodeId === episode.id
                              ? "border-primary bg-primary/10"
                              : "border-muted-foreground/30"
                          )}
                        >
                          {selectedEpisodeId === episode.id && (
                            <PlayCircle className="h-3 w-3 text-primary" />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "font-medium",
                          episode.completed && "text-muted-foreground"
                        )}
                      >
                        {episode.title}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {episode.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="w-full aspect-video rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-24 w-full mt-4" />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="space-y-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <div className="space-y-2 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
