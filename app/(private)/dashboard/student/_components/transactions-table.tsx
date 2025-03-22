"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react"; // Import sorting icon

type Course = {
  title: string;
  price: number;
};

export type Transaction = {
  id: string;
  courses: Course[];
  amount: number;
  date: string;
  status: string;
  payment_method: string;
  url?: string;
};

interface TransactionsTableProps {
  transactions: Transaction[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  return formattedDate;
}

const formatCurrency = (amount: number) => {
  return `${amount.toFixed(2)} DA`;
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => formatDate(row.getValue("date")),
    },
    {
      accessorKey: "courses",
      header: "Courses",
      cell: ({ row }) => (
        <Accordion type="single" collapsible>
          <AccordionItem value="courses">
            <AccordionTrigger className="hover:no-underline">
              course ({row.original.courses.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {row.original.courses.map((course, index) => (
                  <div key={index} className="border-b pb-2 last:border-b-0">
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-gray-500">
                      Price: {formatCurrency(Number(course.price))}
                    </p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => formatCurrency(row.getValue("amount")),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.getValue("status") === "Completed"
              ? "default"
              : row.getValue("status") === "Pending"
              ? "secondary"
              : "destructive"
          }
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "payment_method",
      header: "Payment Method",
      cell: ({ row }) => (
        <Badge variant="default">{row.getValue("payment_method")}</Badge>
      ),
    },
    {
      accessorKey: "url",
      header: "Action",
      cell: ({ row }) =>
        row.original.url && (
          <Button
            variant="destructive"
            onClick={() => window.open(row.original.url, "_blank")}
          >
            Continue
          </Button>
        ),
    },
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (transactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}