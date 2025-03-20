"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  Play,
  Award,
  Clock,
  BarChart,
  Users,
  Star,
  BookOpen,
  MessageSquare,
  ThumbsUp,
  Reply,
  Edit,
  Trash2,
} from "lucide-react";
import { fetchCoursesById } from "../../_actions/CoursesActions";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Define the Episode type
type Episode = {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
};

// Define the Course type
type Course = {
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

// Define Comment type
type Comment = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
};

// Define Review type
type Review = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  createdAt: Date;
  isHelpful?: number;
};

export default function CoursePage() {
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [newReviewContent, setNewReviewContent] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);

  // Mock user data - in a real app, this would come from authentication
  const currentUser = {
    id: "user-1",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
  };

  useEffect(() => {
    async function fetchCourse() {
      try {
        setLoading(true);
        const courseData = await fetchCoursesById(courseId);
        if (courseData) {
          setCourse(courseData as Course);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        setError(
          `Failed to load course: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      } finally {
        setLoading(false);
      }
    }

    if (courseId) {
      fetchCourse();
      // Mock fetching comments and reviews
      fetchMockCommentsAndReviews();
    }
  }, [courseId]);

  // Mock function to fetch comments and reviews
  const fetchMockCommentsAndReviews = () => {
    // Mock comments data
    const mockComments: Comment[] = [
      {
        id: "comment-1",
        userId: "user-2",
        userName: "Alice Johnson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        content:
          "This course is exactly what I needed to understand the fundamentals. The instructor explains concepts clearly.",
        createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
        likes: 5,
        isLiked: false,
        replies: [
          {
            id: "reply-1",
            userId: "user-3",
            userName: "Bob Smith",
            userAvatar: "/placeholder.svg?height=40&width=40",
            content: "I agree! The examples are very practical.",
            createdAt: new Date(Date.now() - 86400000), // 1 day ago
            likes: 2,
            isLiked: true,
          },
        ],
      },
      {
        id: "comment-2",
        userId: "user-4",
        userName: "Emma Davis",
        userAvatar: "/placeholder.svg?height=40&width=40",
        content:
          "I'm struggling with the concepts in episode 3. Does anyone have additional resources they can recommend?",
        createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
        likes: 1,
        isLiked: false,
      },
    ];

    // Mock reviews data
    const mockReviews: Review[] = [
      {
        id: "review-1",
        userId: "user-2",
        userName: "Alice Johnson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        content:
          "Excellent course! The instructor is knowledgeable and explains complex topics in an easy-to-understand way.",
        createdAt: new Date(Date.now() - 86400000 * 10), // 10 days ago
        isHelpful: 12,
      },
      {
        id: "review-2",
        userId: "user-5",
        userName: "Michael Brown",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        content:
          "Great content, but some sections could be more in-depth. Overall, I learned a lot and would recommend it.",
        createdAt: new Date(Date.now() - 86400000 * 15), // 15 days ago
        isHelpful: 8,
      },
      {
        id: "review-3",
        userId: "user-6",
        userName: "Sarah Wilson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 3,
        content:
          "The course is good for beginners, but if you already have some experience, you might find it too basic.",
        createdAt: new Date(Date.now() - 86400000 * 20), // 20 days ago
        isHelpful: 5,
      },
    ];

    // Check if current user has already submitted a review
    const existingUserReview = mockReviews.find(
      (review) => review.userId === currentUser.id
    );

    setComments(mockComments);
    setReviews(mockReviews);
    if (existingUserReview) {
      setUserReview(existingUserReview);
      setNewReviewContent(existingUserReview.content);
      setNewRating(existingUserReview.rating);
    }
  };

  // Handle submitting a new comment
  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);

    // Simulate API call delay
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: `comment-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        content: newComment,
        createdAt: new Date(),
        likes: 0,
        isLiked: false,
      };

      setComments((prevComments) => [newCommentObj, ...prevComments]);
      setNewComment("");
      setIsSubmittingComment(false);
      toast({
        title: "Comment Added",
        description: "Your comment has been successfully added.",
      });
    }, 1000);
  };

  // Handle submitting a reply to a comment
  const handleReplySubmit = (commentId: string) => {
    if (!replyContent.trim()) return;

    setIsSubmittingComment(true);

    // Simulate API call delay
    setTimeout(() => {
      const newReply: Comment = {
        id: `reply-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        content: replyContent,
        createdAt: new Date(),
        likes: 0,
        isLiked: false,
      };

      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          return comment;
        })
      );

      setReplyingTo(null);
      setReplyContent("");
      setIsSubmittingComment(false);
      toast({
        title: "Reply Added",
        description: "Your reply has been successfully added.",
      });
    }, 1000);
  };

  // Handle liking a comment
  const handleLikeComment = (
    commentId: string,
    isReply = false,
    parentId?: string
  ) => {
    if (isReply && parentId) {
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === parentId && comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  return {
                    ...reply,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                    isLiked: !reply.isLiked,
                  };
                }
                return reply;
              }),
            };
          }
          return comment;
        })
      );
    } else {
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            };
          }
          return comment;
        })
      );
    }
  };

  // Handle submitting a new review
  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || !newReviewContent.trim()) {
      toast({
        title: "Error",
        description: "Please provide both a rating and review content.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingReview(true);

    // Simulate API call delay
    setTimeout(() => {
      if (isEditingReview && userReview) {
        // Update existing review
        const updatedReview: Review = {
          ...userReview,
          rating: newRating,
          content: newReviewContent,
          createdAt: new Date(),
        };

        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === userReview.id ? updatedReview : review
          )
        );
        setUserReview(updatedReview);

        toast({
          title: "Review Updated",
          description: "Your review has been successfully updated.",
        });
      } else {
        // Create new review
        const newReviewObj: Review = {
          id: `review-${Date.now()}`,
          userId: currentUser.id,
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
          rating: newRating,
          content: newReviewContent,
          createdAt: new Date(),
          isHelpful: 0,
        };

        setReviews((prevReviews) => [newReviewObj, ...prevReviews]);
        setUserReview(newReviewObj);

        toast({
          title: "Review Added",
          description: "Your review has been successfully added.",
        });
      }

      setIsEditingReview(false);
      setIsSubmittingReview(false);
    }, 1000);
  };

  // Handle deleting a review
  const handleDeleteReview = () => {
    if (!userReview) return;

    // Simulate API call delay
    setTimeout(() => {
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== userReview.id)
      );
      setUserReview(null);
      setNewReviewContent("");
      setNewRating(0);

      toast({
        title: "Review Deleted",
        description: "Your review has been successfully deleted.",
      });
    }, 1000);
  };

  // Calculate course stats
  const totalEpisodes = course?.episodes.length || 0;
  const completedEpisodes =
    course?.episodes.filter((episode) => episode.completed).length || 0;
  const nextEpisodeToWatch = course?.episodes.find(
    (episode) => !episode.completed
  );

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  if (loading) {
    return <CoursePageSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Error Loading Course</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link href="/mycourses">
            <Button>Return to My Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The requested course could not be found.
          </p>
          <Link href="/mycourses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        {/* Course Header Section */}
        <div className="bg-muted py-6 sm:py-8">
          <div className="container mx-auto px-4">
            <Link
              href="/mycourses"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              <span>Back to My Courses</span>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Course Info */}
              <div className="md:col-span-2 order-2 md:order-1 space-y-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {course.category}
                  </Badge>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                    {course.title}
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Instructor: {course.instructor}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center">
                    <Clock className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    {course.totalHours} hours
                  </span>
                  <span className="flex items-center">
                    <BarChart className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    {course.level}
                  </span>
                  <span className="flex items-center">
                    <Star className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    {course.rating}/5
                  </span>
                  <span className="flex items-center">
                    <Users className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    {course.students.toLocaleString()} students
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    {totalEpisodes} episodes
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/mycourses/course/${course.id}/watch/${
                      nextEpisodeToWatch?.id || course.id
                    }`}
                  >
                    <Button size="lg" className="gap-2 w-full sm:w-auto">
                      <Play className="h-4 w-4" />
                      {completedEpisodes > 0
                        ? "Continue Learning"
                        : "Start Learning"}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Course Thumbnail and Progress */}
              <div className="md:col-span-1 order-1 md:order-2">
                <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.thumbnail}`}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Your Progress</span>
                        <span className="text-sm font-medium">
                          {course.progress}% complete
                        </span>
                      </div>
                      <Progress
                        value={course.progress}
                        className="h-2.5 mb-2"
                      />
                      <div className="text-sm text-muted-foreground">
                        {completedEpisodes} of {totalEpisodes} episodes
                        completed
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-sm border-t">
                      <span className="text-muted-foreground">Time spent:</span>
                      <span className="font-medium flex items-center">
                        <Clock className="inline mr-1.5 h-4 w-4 text-muted-foreground" />
                        {course.completedHours}/{course.totalHours} hrs
                      </span>
                    </div>

                    {course.lastAccessed && (
                      <div className="text-xs text-muted-foreground pt-1">
                        Last accessed:{" "}
                        {new Date(course.lastAccessed).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Section */}
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 w-full sm:w-auto grid grid-cols-2 sm:inline-flex">
              <TabsTrigger value="overview" className="flex-1 sm:flex-initial">
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="flex-1 sm:flex-initial"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger
                value="discussions"
                className="flex-1 sm:flex-initial"
              >
                Discussions
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 sm:flex-initial">
                Reviews
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent
              value="overview"
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <div className="prose max-w-none dark:prose-invert">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                  About This Course
                </h2>
                <div className="space-y-4">
                  <p>{course.description}</p>

                  <div className="bg-muted/50 p-4 rounded-lg mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-medium mb-1">Category</h3>
                      <p className="text-muted-foreground">{course.category}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Level</h3>
                      <p className="text-muted-foreground">{course.level}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Last Updated</h3>
                      <p className="text-muted-foreground">
                        {course.updatedAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Curriculum Tab */}
            <TabsContent
              value="curriculum"
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                  Course Curriculum
                </h2>
                <div className="space-y-3">
                  {course.episodes.map((episode, index) => (
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
                          <Link
                            href={`/mycourses/course/${course.id}/watch/${episode.id}`}
                          >
                            <Button size="sm" variant="outline">
                              <Play className="h-3.5 w-3.5 mr-1" />
                              Watch
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Discussions Tab */}
            <TabsContent
              value="discussions"
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                  Course Discussions
                </h2>

                {/* Comment Form */}
                <Card className="mb-6">
                  <CardHeader>
                    <h3 className="text-lg font-medium">Add a Comment</h3>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCommentSubmit}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="comment">Your comment</Label>
                          <Textarea
                            id="comment"
                            placeholder="Share your thoughts or ask a question..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full sm:w-auto ml-auto"
                          disabled={isSubmittingComment || !newComment.trim()}
                        >
                          {isSubmittingComment
                            ? "Submitting..."
                            : "Post Comment"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No comments yet
                      </h3>
                      <p className="text-muted-foreground">
                        Be the first to start a discussion about this course.
                      </p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <Card key={comment.id} className="border">
                        <CardHeader className="pb-2">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage
                                src={comment.userAvatar}
                                alt={comment.userName}
                              />
                              <AvatarFallback>
                                {comment.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">
                                    {comment.userName}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDate(comment.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p>{comment.content}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-muted-foreground hover:text-foreground"
                              onClick={() => handleLikeComment(comment.id)}
                            >
                              <ThumbsUp
                                className={`h-4 w-4 ${
                                  comment.isLiked
                                    ? "fill-primary text-primary"
                                    : ""
                                }`}
                              />
                              <span>{comment.likes}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-muted-foreground hover:text-foreground"
                              onClick={() =>
                                setReplyingTo(
                                  replyingTo === comment.id ? null : comment.id
                                )
                              }
                            >
                              <Reply className="h-4 w-4" />
                              <span>Reply</span>
                            </Button>
                          </div>
                        </CardFooter>

                        {/* Reply Form */}
                        {replyingTo === comment.id && (
                          <div className="px-4 pb-4">
                            <div className="pl-10 border-l-2 mt-2">
                              <div className="grid gap-2 mb-2">
                                <Textarea
                                  placeholder="Write a reply..."
                                  value={replyContent}
                                  onChange={(e) =>
                                    setReplyContent(e.target.value)
                                  }
                                  className="min-h-[80px]"
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setReplyingTo(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleReplySubmit(comment.id)}
                                  disabled={
                                    isSubmittingComment || !replyContent.trim()
                                  }
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="px-4 pb-4">
                            <div className="pl-10 border-l-2 space-y-4">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="pt-2">
                                  <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={reply.userAvatar}
                                        alt={reply.userName}
                                      />
                                      <AvatarFallback>
                                        {reply.userName.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <p className="font-medium text-sm">
                                          {reply.userName}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {formatDate(reply.createdAt)}
                                        </p>
                                      </div>
                                      <p className="text-sm mt-1">
                                        {reply.content}
                                      </p>
                                      <div className="flex items-center gap-4 mt-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
                                          onClick={() =>
                                            handleLikeComment(
                                              reply.id,
                                              true,
                                              comment.id
                                            )
                                          }
                                        >
                                          <ThumbsUp
                                            className={`h-3 w-3 ${
                                              reply.isLiked
                                                ? "fill-primary text-primary"
                                                : ""
                                            }`}
                                          />
                                          <span>{reply.likes}</span>
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent
              value="reviews"
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                  Course Reviews
                </h2>

                {/* Review Stats */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-card p-6 rounded-lg border">
                    <div className="text-center py-4">
                      <Award className="h-12 w-12 mx-auto text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        Course Rating
                      </h3>
                      <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
                        {course.rating}
                        <span className="text-xl text-muted-foreground">
                          /5
                        </span>
                      </div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Number.parseInt(course.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">
                        Based on {course.students.toLocaleString()} students
                      </p>
                    </div>
                  </div>

                  {/* Add/Edit Review Form */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-medium">
                        {userReview
                          ? isEditingReview
                            ? "Edit Your Review"
                            : "Your Review"
                          : "Add Your Review"}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      {userReview && !isEditingReview ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < userReview.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">
                              {formatDate(userReview.createdAt)}
                            </span>
                          </div>
                          <p>{userReview.content}</p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsEditingReview(true)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit Review
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleDeleteReview}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleReviewSubmit}>
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="rating">Rating</Label>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    className="focus:outline-none"
                                    onClick={() => setNewRating(i + 1)}
                                  >
                                    <Star
                                      className={`h-6 w-6 cursor-pointer ${
                                        i < newRating
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="review">Your review</Label>
                              <Textarea
                                id="review"
                                placeholder="Share your experience with this course..."
                                value={newReviewContent}
                                onChange={(e) =>
                                  setNewReviewContent(e.target.value)
                                }
                                className="min-h-[100px]"
                              />
                            </div>
                            <div className="flex gap-2 justify-end">
                              {isEditingReview && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    setIsEditingReview(false);
                                    if (userReview) {
                                      setNewReviewContent(userReview.content);
                                      setNewRating(userReview.rating);
                                    }
                                  }}
                                >
                                  Cancel
                                </Button>
                              )}
                              <Button
                                type="submit"
                                disabled={
                                  isSubmittingReview ||
                                  newRating === 0 ||
                                  !newReviewContent.trim()
                                }
                              >
                                {isSubmittingReview
                                  ? "Submitting..."
                                  : isEditingReview
                                  ? "Update Review"
                                  : "Submit Review"}
                              </Button>
                            </div>
                          </div>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Student Reviews</h3>
                  <Separator className="my-4" />

                  {reviews.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No reviews yet
                      </h3>
                      <p className="text-muted-foreground">
                        Be the first to review this course.
                      </p>
                    </div>
                  ) : (
                    reviews
                      .filter((review) => review.userId !== currentUser.id) // Filter out current user's review
                      .map((review) => (
                        <div
                          key={review.id}
                          className="border-b pb-6 last:border-b-0"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage
                                src={review.userAvatar}
                                alt={review.userName}
                              />
                              <AvatarFallback>
                                {review.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <p className="font-medium">{review.userName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(review.createdAt)}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="mt-2">{review.content}</p>
                              <div className="flex items-center gap-2 mt-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  <ThumbsUp className="h-3.5 w-3.5" />
                                  <span>Helpful ({review.isHelpful})</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

// Skeleton loader for the course page
function CoursePageSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <div className="bg-muted py-6 sm:py-8">
          <div className="container mx-auto px-4">
            <Skeleton className="h-6 w-32 mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="md:col-span-2 order-2 md:order-1 space-y-4">
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full max-w-md mb-2" />
                  <Skeleton className="h-6 w-48" />
                </div>

                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24" />
                </div>

                <div className="pt-2">
                  <Skeleton className="h-10 w-40" />
                </div>
              </div>

              <div className="md:col-span-1 order-1 md:order-2">
                <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
                  <Skeleton className="w-full aspect-video" />
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Skeleton className="h-5 w-28" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <Skeleton className="h-2.5 w-full mb-2" />
                      <Skeleton className="h-4 w-40" />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 sm:py-10">
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </main>
    </div>
  );
}
