export type Episode = {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
};

// Define the Course type
export type Course = {
  id: number;
  title: string;
  instructor: string;
  thumbnail: string;
  description: string;
  progress: number;
  totalHours: number;
  completedHours: number;
  lastAccessed: string | null;
  rating: string;
  students: number;
  category: string;
  level: string;
  updatedAt: string;
  episodes: Episode[];
};

export type Replys = {
  parentId: string; // ID of the parent comment
  id: string; // Unique ID of the reply
  userId?: string; // ID of the user who posted the reply
  userName?: string; // Name of the user who posted the reply
  userAvatar?: string; // Avatar URL of the user who posted the reply
  content: string; // Content of the reply
  createdAt: Date | string; // Timestamp of when the reply was created
};

// Define Comment type
export type Comment = {
  id: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
  replies?: number;
};

// Define Review type
export type Review = {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
};
