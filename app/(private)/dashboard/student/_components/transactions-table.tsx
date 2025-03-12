"use client"

import { fetchTransactions } from "../_actions/data"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Loading from "../loading"

type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  status: "completed" | "pending" | "refunded"
  type: "course"
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTransactions()
        setTransactions(data)
      } catch (error) {
        console.error("Failed to fetch transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  if (loading) {
    return <Loading/>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="whitespace-nowrap">{transaction.date}</TableCell>
              <TableCell className="max-w-[200px] truncate">{transaction.description}</TableCell>
              <TableCell className="whitespace-nowrap">${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.status === "completed"
                      ? "default"
                      : transaction.status === "pending"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{transaction.type}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

