"use client"

import { useEffect, useState } from "react";
import { Transaction } from "../_lib/shemaTransaction";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

export default function TransactionManagment({
  initialTransactions,
}: {
  initialTransactions: Transaction[];
}) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate automatic processing of pending transactions
    const processingInterval = setInterval(() => {
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.status === "Pending"
            ? {
                ...transaction,
                status: Math.random() > 0.2 ? "Completed" : "Failed",
              }
            : transaction
        )
      );
    }, 5000); // Process every 5 seconds

    return () => clearInterval(processingInterval);
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Transaction Management</h1>
      <div className="flex justify-between mb-4">
        <Input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="sm" className="text-lg">
          Total Amount : 647450 DA
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.user}</TableCell>
              <TableCell>{transaction.course}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.paymentMethod}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.status === "Completed"
                      ? "default"
                      : transaction.status === "Pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
