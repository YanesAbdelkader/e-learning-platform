"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import AddIssue from "../../student/_components/addIssue"

export type Issue = {
  id: string
  title: string
  content: string
  date: string
  status: "open" | "in-progress" | "resolved" | "closed"
}

type IssuesTableProps = {
  issues: Issue[]
}

type SortField = "date" | "status"
type SortDirection = "asc" | "desc"

export function IssuesTable({ issues }: IssuesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline">Open</Badge>
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>
      case "resolved":
        return <Badge variant="default">Resolved</Badge>
      case "closed":
        return <Badge variant="destructive">Closed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString)

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)

    return formattedDate
  }

  const filteredIssues = issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to descending
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
    return sortDirection === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
  }

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else if (sortField === "status") {
      // Define status priority for sorting
      const statusPriority = {
        open: 0,
        "in-progress": 1,
        resolved: 2,
        closed: 3,
      }

      const priorityA = statusPriority[a.status]
      const priorityB = statusPriority[b.status]

      return sortDirection === "asc" ? priorityA - priorityB : priorityB - priorityA
    }
    return 0
  })

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Issues</h1>
        <div className="flex flex-col items-center justify-between sm:flex-row gap-2">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search issues..."
              className="w-full pl-8 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <AddIssue />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Course</TableHead>
              <TableHead onClick={() => handleSort("date")} className="cursor-pointer hover:bg-muted/50">
                <div className="flex items-center">
                  Date
                  {getSortIcon("date")}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("status")} className="cursor-pointer hover:bg-muted/50">
                <div className="flex items-center">
                  Status
                  {getSortIcon("status")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-medium max-w-[200px] truncate">{issue.title}</TableCell>
                <TableCell className="max-w-[150px] truncate">{issue.content}</TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(issue.date)}</TableCell>
                <TableCell>{getStatusBadge(issue.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

