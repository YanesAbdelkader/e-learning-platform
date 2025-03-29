"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { updateIssues } from "../_actions/IssuesActions";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component

type Issue = {
  id: number;
  title: string;
  content: string;
  reporter: string;
  date: string;
  status: "open" | "in progress" | "resolved" | "closed";
};

type IssuesTableProps = {
  issues: Issue[];
};

type Status = "open" | "in progress" | "resolved" | "closed";

export default function IssueManagement({ issues }: IssuesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredIssues = issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.reporter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function updateIssueStatus(id: number, status: Status): Promise<void> {
    setIsUpdating(true);
    try {
      const result = await updateIssues(id, status);
      if (result?.success) {
        toast({
          title: "Update Success",
          description: `Issue status updated to ${status}.`,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Update Failed",
        description: "An error occurred while updating the issue status.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  }

  const StatusButton = ({
    issueId,
    status,
  }: {
    issueId: number;
    status: Status;
  }) => (
    <Button
      onClick={() => updateIssueStatus(issueId, status)}
      disabled={isUpdating}
      variant="outline"
    >
      {status}
    </Button>
  );

  const getBadgeColor = (status: Status) => {
    switch (status) {
      case "open":
        return "bg-blue-500";
      case "in progress":
        return "bg-yellow-500";
      case "resolved":
        return "bg-green-500";
      case "closed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

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
            <TableHead>Content</TableHead>
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
              <TableCell>{issue.content}</TableCell>
              <TableCell>{issue.reporter}</TableCell>
              <TableCell>{issue.date}</TableCell>
              <TableCell>
                <Badge className={getBadgeColor(issue.status)}>
                  {issue.status}
                </Badge>
              </TableCell>
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
                      <DialogDescription>
                        Choose the new status for this issue.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-around">
                      <StatusButton issueId={issue.id} status="in progress" />
                      <StatusButton issueId={issue.id} status="resolved" />
                      <StatusButton issueId={issue.id} status="closed" />
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
