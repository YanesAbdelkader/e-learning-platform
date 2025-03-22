import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Reply, Loader2 } from "lucide-react";
import { Comment, Replys } from "../../_lib/type";
import {
  commentSubmit,
  fetchMockComments,
  fetchReplies,
  replySubmit,
} from "../../_actions/comments-reviewsActions";

const formatDate = (date: Date | string | undefined | null) => {
  if (!date) return "Invalid date";
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime())
    ? "Invalid date"
    : new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(parsedDate);
};

export function Comments({ courseId }: { courseId: string }) {
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [repliesMap, setRepliesMap] = useState<Record<string, Replys[]>>({});
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  const [loadingReplies, setLoadingReplies] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingComment(true);
    try {
      const newCommentData = await commentSubmit(courseId, newComment);
      if (newCommentData) {
        setComments((prev) => [newCommentData, ...prev]);
        setNewComment("");
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleFetchReplies = async (commentId: string) => {
    setLoadingReplies((prev) => ({ ...prev, [commentId]: true }));
    try {
      const replies = await fetchReplies(commentId);
      setRepliesMap((prev) => ({ ...prev, [commentId]: replies || [] }));
    } catch (error) {
      console.error("Failed to fetch replies:", error);
    } finally {
      setLoadingReplies((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  const handleAddReply = async (commentId: string) => {
    if (!replyContent.trim()) {
      setReplyError("Reply content cannot be empty.");
      return;
    }

    setIsSubmittingReply(true);
    setReplyError(null);

    try {
      const newReplyData = await replySubmit(commentId, replyContent, courseId);
      if (newReplyData) {
        setRepliesMap((prev) => ({
          ...prev,
          [commentId]: [newReplyData, ...(prev[commentId] || [])],
        }));
        setExpandedComments((prev) => new Set(prev).add(commentId));
        setReplyContent("");
        setReplyingTo(null);
      }
    } catch (err) {
      console.error("Error submitting reply:", err);
      setReplyError("Failed to submit reply. Please try again.");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const commentsData = await fetchMockComments(courseId);
        if (commentsData) {
          setComments(commentsData);
        }
      } catch (err) {
        setError(`${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Discussions</h2>

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
                {isSubmittingComment ? "Submitting..." : "Post Comment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">
            Failed to load comments: {error}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No comments yet</h3>
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
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${comment.userAvatar}`}
                      alt={comment.userName || ""}
                    />
                    <AvatarFallback>
                      {comment.userName?.charAt(0) || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{comment.userName || ""}</p>
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
                    onClick={() =>
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id
                      )
                    }
                  >
                    <Reply className="h-4 w-4" />
                    <span>Reply</span>
                  </Button>
                  {comment.replies && comment.replies > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        if (!expandedComments.has(comment.id)) {
                          handleFetchReplies(comment.id);
                          setExpandedComments((prev) =>
                            new Set(prev).add(comment.id)
                          );
                        } else {
                          setExpandedComments((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(comment.id);
                            return newSet;
                          });
                        }
                      }}
                      aria-label={
                        expandedComments.has(comment.id)
                          ? "Hide Replies"
                          : "Show Replies"
                      }
                      aria-busy={loadingReplies[comment.id]}
                    >
                      <Reply className="h-4 w-4" />
                      <span>
                        {loadingReplies[comment.id] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : expandedComments.has(comment.id) ? (
                          "Hide Replies"
                        ) : (
                          `Show Replies (${comment.replies})`
                        )}
                      </span>
                    </Button>
                  )}
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
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                    {replyError && (
                      <p className="text-sm text-red-500 mb-2">{replyError}</p>
                    )}
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyError(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAddReply(comment.id)}
                        disabled={isSubmittingReply || !replyContent.trim()}
                      >
                        {isSubmittingReply ? "Submitting..." : "Reply"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Replies */}
              {expandedComments.has(comment.id) &&
                repliesMap[comment.id] &&
                repliesMap[comment.id].length > 0 && (
                  <div className="px-4 pb-4">
                    <div className="pl-10 border-l-2 space-y-4">
                      {repliesMap[comment.id].map((reply) => (
                        <div key={reply.id} className="pt-2">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${reply.userAvatar}`}
                                alt={reply.userName || ""}
                              />
                              <AvatarFallback>
                                {reply.userName?.charAt(0) || ""}
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
                              <p className="text-sm mt-1">{reply.content}</p>
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
  );
}