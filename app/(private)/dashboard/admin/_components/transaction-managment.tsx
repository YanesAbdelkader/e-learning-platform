"use client";

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
import { fetchTransactions } from "../_actions/TransactionsActions";
import Loading from "@/app/(public)/loading";

export default function TransactionManagment() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const { total_amount, transaction } = await fetchTransactions();
        setTransactions(transaction);
        setTotalAmount(Number(total_amount));
      } catch (error) {
        console.log("Error loading data:", error);
        setTransactions([]);
        setTotalAmount(0);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.courses
        .map((course) => course.title)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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
          Total Amount : {totalAmount} DA
        </Button>
      </div>
      {loading ? (
        <Loading />
      ) : (
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
                <TableCell>
                  <ul className="list-none space-y-1">
                    {transaction.courses.map((course) => (
                      <li key={course.title}>{course.title}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{transaction.amount} DA</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.payment_method}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === "Completed"
                        ? "default"
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
      )}
    </div>
  );
}
