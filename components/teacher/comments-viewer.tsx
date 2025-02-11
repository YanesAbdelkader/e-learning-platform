"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

type Comment = {
  id: number
  student: string
  course: string
  comment: string
  replies: { id: number; author: string; text: string }[]
}

const initialComments: Comment[] = [
  {
    id: 1,
    student: "Alice Johnson",
    course: "Introduction to React",
    comment: "Great course! Very informative.",
    replies: [{ id: 1, author: "Instructor", text: "Thank you for your feedback, Alice!" }],
  },
  {
    id: 2,
    student: "Bob Smith",
    course: "Advanced JavaScript",
    comment: "Challenging but rewarding.",
    replies: [],
  },
  {
    id: 3,
    student: "Charlie Brown",
    course: "Web Design Fundamentals",
    comment: "Could use more examples.",
    replies: [],
  },
]

export function CommentsViewer() {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [searchTerm, setSearchTerm] = useState("")
  const [replyText, setReplyText] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const filteredComments = comments.filter(
    (comment) =>
      comment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.comment.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleReply = (commentId: number) => {
    if (replyText.trim() === "") return

    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, { id: Date.now(), author: "Instructor", text: replyText }],
          }
        }
        return comment
      }),
    )

    setReplyText("")
    setReplyingTo(null)
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search comments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      {filteredComments.map((comment) => (
        <Card key={comment.id}>
          <CardHeader>
            <CardTitle>
              {comment.student} - {comment.course}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{comment.comment}</p>
            {comment.replies.map((reply) => (
              <div key={reply.id} className="ml-4 mt-2 p-2 bg-muted rounded-md">
                <p className="font-semibold">{reply.author}</p>
                <p>{reply.text}</p>
              </div>
            ))}
            {replyingTo === comment.id ? (
              <div className="mt-4">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={() => handleReply(comment.id)}>Send Reply</Button>
                <Button variant="outline" onClick={() => setReplyingTo(null)} className="ml-2">
                  Cancel
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setReplyingTo(comment.id)} className="mt-4">
                Reply
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

