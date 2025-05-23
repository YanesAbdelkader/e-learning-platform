import { fetchTransactions } from "../_actions/data";
import { TransactionsTable } from "../_components/transactions-table";

export default async function TransactionsPage() {
  const transactions = await fetchTransactions();
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
      </div>
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
