"use client";

import { useEffect, useState } from "react";
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
import { Transaction } from "../_lib/shemaTransaction";
import { fetchTransactions } from "../_actions/TransactionActions";
import Loading from "@/app/(public)/loading";
import { Search, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const { total_amount, transaction } = await fetchTransactions();
        setTransactions(transaction);
        setTotalAmount(Number(total_amount));
        setError(null);
      } catch (error) {
        console.log("Error loading data:", error);
        setTransactions([]);
        setTotalAmount(0);
        setError("Failed to load transactions. Please try again later.");
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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString(); // Use browser's built-in locale string
    } catch {
      return dateString; // fallback if date parsing fails
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Transaction Management</h1>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Total: {totalAmount.toLocaleString()} DA
        </Badge>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by user or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : filteredTransactions.length === 0 ? (
        transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              No transactions yet
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Search className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              No transactions match your search
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm("")}
            >
              Clear search
            </Button>
          </div>
        )
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">User</TableHead>
                <TableHead>Course(s)</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.user}
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      {transaction.courses.map((course) => (
                        <li key={course.title} className="text-sm">
                          {course.title}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{transaction.amount.toLocaleString()} DA</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell className="capitalize">
                    {transaction.payment_method.toLowerCase()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "Completed"
                          ? "default"
                          : "destructive"
                      }
                      className="whitespace-nowrap"
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}