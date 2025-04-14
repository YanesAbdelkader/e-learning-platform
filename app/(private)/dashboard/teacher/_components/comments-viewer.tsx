"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";
import {
  addCommentsReply as apiAddCommentsReply,
  deleteComments as apiDeleteComments,
  deleteCommentsReply as apiDeleteCommentsReply,
} from "../_actions/CommentsActions";
import { useToast } from "@/hooks/use-toast";

export type Comment = {
  id: number;
  student: string;
  course: string;
  comment: string;
  replies: { id: number; author: string; text: string }[];
};

interface CommentProps {
  initialComments: Comment[];
}

export function CommentsViewer({ initialComments }: CommentProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [searchTerm, setSearchTerm] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { toast } = useToast();

  // Memoize the filtered comments to avoid recalculation on every render
  const filteredComments = useCallback(
    () =>
      comments.filter(
        (comment) =>
          comment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.comment.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [comments, searchTerm]
  );

  const handleReply = useCallback(
    async (commentId: number) => {
      if (replyText.trim() === "") return;
      setIsSubmitting(true);
      try {
        const result = await apiAddCommentsReply(commentId, replyText);
        if (result?.success) {
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    replies: [
                      ...comment.replies,
                      {
                        id: Date.now(),
                        author: "Instructor",
                        text: replyText,
                      },
                    ],
                  }
                : comment
            )
          );
          setReplyText("");
          setReplyingTo(null);
          toast({
            title: "Success",
            description: "Reply added successfully",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to add reply",
          });
          console.log("Failed to add reply");
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to add reply",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [replyText, setComments, toast, setIsSubmitting]
  );

  const handleDeleteComment = useCallback(
    async (commentId: number) => {
      setDeletingId(commentId);
      try {
        const result = await apiDeleteComments(commentId);
        if (result?.success) {
          setComments((prev) =>
            prev.filter((comment) => comment.id !== commentId)
          );
          toast({
            title: "Success",
            description: "Comment deleted successfully",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to delete comment",
          });
          console.log("Failed to delete comment");
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to delete comment",
        });
      } finally {
        setDeletingId(null);
      }
    },
    [setComments, toast, setDeletingId]
  );

  const handleDeleteReply = useCallback(
    async (commentId: number, replyId: number) => {
      setDeletingId(replyId);
      try {
        const result = await apiDeleteCommentsReply(replyId);
        if (result?.success) {
          setComments((prev) =>
            prev.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    replies: comment.replies.filter(
                      (reply) => reply.id !== replyId
                    ),
                  }
                : comment
            )
          );
          toast({
            title: "Success",
            description: "Reply deleted successfully",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to delete reply",
          });
          console.log("Failed to delete reply");
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to delete reply",
        });
      } finally {
        setDeletingId(null);
      }
    },
    [setComments, toast, setDeletingId]
  );

  const memoizedFilteredComments = filteredComments();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Input
          placeholder="Search comments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {memoizedFilteredComments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchTerm ? "No matching comments found" : "No comments available"}
        </div>
      ) : (
        <div className="space-y-4">
          {memoizedFilteredComments.map((comment) => (
            <Card
              key={comment.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="relative">
                <CardTitle className="text-lg">
                  <span className="font-medium">{comment.student}</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {comment.course}
                  </span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 h-8 w-8"
                  onClick={() => handleDeleteComment(comment.id)}
                  disabled={deletingId === comment.id}
                >
                  {deletingId === comment.id ? (
                    <span className="animate-spin">...</span>
                  ) : (
                    <Trash2 className="h-4 w-4 text-red-500" />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <p className="mb-4 whitespace-pre-line">{comment.comment}</p>

                {comment.replies.length > 0 && (
                  <div className="space-y-3 mt-4 pl-4 border-l-2 border-muted">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-3 bg-muted/50 rounded-md relative"
                      >
                        <p className="font-medium text-sm">{reply.author}</p>
                        <p className="text-sm mt-1 whitespace-pre-line">
                          {reply.text}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() =>
                            handleDeleteReply(comment.id, reply.id)
                          }
                          disabled={deletingId === reply.id}
                        >
                          {deletingId === reply.id ? (
                            <span className="animate-spin text-xs">...</span>
                          ) : (
                            <Trash2 className="h-3 w-3 text-red-500" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {replyingTo === comment.id ? (
                  <div className="mt-4 space-y-2">
                    <Textarea
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      disabled={isSubmitting}
                      className="min-h-[100px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleReply(comment.id)}
                        disabled={isSubmitting || !replyText.trim()}
                      >
                        {isSubmitting ? "Sending..." : "Send Reply"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setReplyingTo(null)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyingTo(comment.id)}
                    className="mt-4"
                  >
                    Reply
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentsViewerSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Skeleton className="h-10 w-full max-w-xs" />
      </div>

      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />

            <div className="space-y-3 mt-4 pl-4 border-l-2 border-muted">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="p-3 bg-muted/50 rounded-md space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>

            <Skeleton className="h-10 w-24 mt-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
