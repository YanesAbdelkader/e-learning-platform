"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Issue = {
  id: number
  title: string
  reporter: string
  date: string
  status: "Open" | "In Progress" | "Resolved"
}

export default function IssueManagement() {
  const [issues, setIssues] = useState<Issue[]>([
    { id: 1, title: "Login not working", reporter: "John Doe", date: "2023-05-15", status: "Open" },
    { id: 2, title: "Video playback issue", reporter: "Jane Smith", date: "2023-05-14", status: "In Progress" },
    { id: 3, title: "Certificate not generating", reporter: "Mike Johnson", date: "2023-05-13", status: "Resolved" },
  ])
  const [searchTerm, setSearchTerm] = useState("")

  const updateIssueStatus = (issueId: number, newStatus: "Open" | "In Progress" | "Resolved") => {
    setIssues(issues.map((issue) => (issue.id === issueId ? { ...issue, status: newStatus } : issue)))
  }

  const filteredIssues = issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.reporter.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Reporter</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredIssues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>{issue.title}</TableCell>
              <TableCell>{issue.reporter}</TableCell>
              <TableCell>{issue.date}</TableCell>
              <TableCell>{issue.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" size="sm">
                      Update Status
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Issue Status</DialogTitle>
                      <DialogDescription>Choose the new status for this issue.</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-around">
                      <Button onClick={() => updateIssueStatus(issue.id, "Open")}>Open</Button>
                      <Button onClick={() => updateIssueStatus(issue.id, "In Progress")}>In Progress</Button>
                      <Button onClick={() => updateIssueStatus(issue.id, "Resolved")}>Resolved</Button>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

