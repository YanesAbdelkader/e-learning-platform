"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  List,
  X,
  Maximize,
  Volume2,
  Settings,
  PlayCircle,
  PauseCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMobile } from "@/hooks/usemobile";

// Mock data for the current lecture
const currentLecture = {
  id: 1,
  title: "HTML Document Structure",
  description:
    "Learn about the basic structure of an HTML document and how to create your first HTML page.",
  videoUrl: "https://example.com/video.mp4", // This would be a real video URL in a production app
  duration: "14:20",
  courseId: 1,
  courseTitle: "Complete Web Development Bootcamp",
  sectionTitle: "HTML Fundamentals",
  nextLecture: {
    id: 2,
    title: "HTML Elements and Attributes",
  },
  prevLecture: {
    id: 0,
    title: "Introduction to HTML",
  },
};

export default function WatchPage() {
  const isMobile = useMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState(0);
  const [volume, setVolume] = useState(80);

  // In a real app, you would use a video player library like react-player
  // This is a simplified version for demonstration purposes

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number.parseInt(e.target.value));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Convert duration string to seconds for progress calculation
  const durationParts = currentLecture.duration.split(":");
  const durationInSeconds =
    Number.parseInt(durationParts[0]) * 60 + Number.parseInt(durationParts[1]);

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      {/* Video header */}
      <div className="flex items-center justify-between p-4 bg-background/10 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/mycourses/course/${currentLecture.courseId}`}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to course</span>
            </Link>
          </Button>
          <div>
            <h1 className="font-medium">{currentLecture.title}</h1>
            <p className="text-xs text-muted-foreground">
              {currentLecture.sectionTitle} • {currentLecture.courseTitle}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? (
            <X className="h-5 w-5" />
          ) : (
            <List className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Video player */}
        <div
          className={`flex-1 flex flex-col ${showSidebar ? "md:mr-80" : ""}`}
        >
          <div className="relative flex-1 bg-black flex items-center justify-center">
            {/* Video placeholder - in a real app, this would be a video player */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-20 w-20 rounded-full bg-background/20 backdrop-blur-sm"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <PauseCircle className="h-12 w-12" />
                  ) : (
                    <PlayCircle className="h-12 w-12" />
                  )}
                </Button>
              </div>

              {/* Video controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs">{formatTime(currentTime)}</span>
                    <Progress
                      value={(currentTime / durationInSeconds) * 100}
                      className="h-1 flex-1"
                    />
                    <span className="text-xs">{currentLecture.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="icon" onClick={togglePlay}>
                        {isPlaying ? (
                          <PauseCircle className="h-5 w-5" />
                        ) : (
                          <PlayCircle className="h-5 w-5" />
                        )}
                        <span className="sr-only">
                          {isPlaying ? "Pause" : "Play"}
                        </span>
                      </Button>

                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-muted rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Settings</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Maximize className="h-4 w-4" />
                        <span className="sr-only">Fullscreen</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video navigation */}
          <div className="flex items-center justify-between p-4 bg-background text-foreground">
            <Button
              variant="ghost"
              asChild
              disabled={!currentLecture.prevLecture.id}
            >
              <Link
                href={`/course/${currentLecture.courseId}/watch?lecture=${currentLecture.prevLecture.id}`}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Lecture
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                href={`/course/${currentLecture.courseId}/watch?lecture=${currentLecture.nextLecture.id}`}
              >
                Next Lecture
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className="w-full md:w-80 h-full border-l bg-background text-foreground overflow-y-auto">
            <Tabs defaultValue="content">
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">
                  Content
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex-1">
                  Notes
                </TabsTrigger>
                <TabsTrigger value="transcript" className="flex-1">
                  Transcript
                </TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="p-0">
                <div className="p-4">
                  <h3 className="font-medium mb-2">HTML Fundamentals</h3>
                  <ul className="space-y-1">
                    <li className="p-2 rounded bg-muted/50 text-sm">
                      <div className="font-medium">Introduction to HTML</div>
                      <div className="text-xs text-muted-foreground">
                        10:15 • Completed
                      </div>
                    </li>
                    <li className="p-2 rounded bg-primary/10 text-sm border-l-2 border-primary">
                      <div className="font-medium">HTML Document Structure</div>
                      <div className="text-xs text-muted-foreground">
                        14:20 • Currently watching
                      </div>
                    </li>
                    <li className="p-2 rounded hover:bg-muted/50 text-sm">
                      <div className="font-medium">
                        HTML Elements and Attributes
                      </div>
                      <div className="text-xs text-muted-foreground">
                        22:10 • Next
                      </div>
                    </li>
                    <li className="p-2 rounded hover:bg-muted/50 text-sm">
                      <div className="font-medium">HTML Forms</div>
                      <div className="text-xs text-muted-foreground">28:45</div>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="notes" className="p-4">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    You haven&apos;t taken any notes for this lecture yet.
                  </p>
                  <Button variant="outline" className="mt-4">
                    Add Note
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="transcript" className="p-4">
                <p className="text-sm mb-4">
                  In this lecture, we&apos;re going to learn about the basic
                  structure of an HTML document. HTML, or Hypertext Markup
                  Language, is the standard markup language for documents
                  designed to be displayed in a web browser.
                </p>
                <p className="text-sm mb-4">
                  Every HTML document starts with a DOCTYPE declaration,
                  followed by the html element, which contains the head and body
                  elements. The head element contains meta information about the
                  document, while the body element contains the content that is
                  visible to users.
                </p>
                <p className="text-sm">
                  Let&apos;s create our first HTML document together. Open your
                  favorite text editor and follow along as I walk through each
                  step of creating a properly structured HTML document.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
