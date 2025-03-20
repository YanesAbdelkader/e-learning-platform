export type Transaction = {
  id: number;
  user: string;
  courses:  { title: string }[];
  amount: number;
  date: string;
  status:"Completed" | "Failed";
  payment_method: string;
};

