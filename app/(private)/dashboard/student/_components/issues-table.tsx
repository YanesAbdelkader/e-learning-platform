"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchIssues } from "../_actions/data";
import Loading from "../loading";

type Issue = {
  id: string;
  title: string;
  course: string;
  date: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
};

export function IssuesTable() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchIssues();
        setIssues(data);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline">Open</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "resolved":
        return <Badge variant="default">Resolved</Badge>;
      case "closed":
        return <Badge variant="destructive">Closed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return <Badge className="bg-blue-500">Low</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium max-w-[200px] truncate">
                {issue.title}
              </TableCell>
              <TableCell className="max-w-[150px] truncate">
                {issue.course}
              </TableCell>
              <TableCell className="whitespace-nowrap">{issue.date}</TableCell>
              <TableCell>{getStatusBadge(issue.status)}</TableCell>
              <TableCell>{getPriorityBadge(issue.priority)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
