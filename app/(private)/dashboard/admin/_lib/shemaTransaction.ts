export type Transaction = {
  id: number;
  user: string;
  course: string;
  amount: number;
  date: string;
  status: "Pending" | "Completed" | "Failed";
  paymentMethod: string;
};

export const initialTransactions: Transaction[] = [
  {
    id: 1,
    user: "John Doe",
    course: "Introduction to React",
    amount: 99.99,
    date: "2023-05-15 10:30:00",
    status: "Pending",
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    user: "Jane Smith",
    course: "Advanced JavaScript",
    amount: 149.99,
    date: "2023-05-14 15:45:00",
    status: "Completed",
    paymentMethod: "PayPal",
  },
  {
    id: 3,
    user: "Mike Johnson",
    course: "Python for Beginners",
    amount: 79.99,
    date: "2023-05-13 09:15:00",
    status: "Failed",
    paymentMethod: "Debit Card",
  },
];
