import TransactionManagment from "../_components/transaction-managment";
import { initialTransactions } from "../_lib/shemaTransaction";

export default function page() {
  return (
    <TransactionManagment initialTransactions={initialTransactions}/>
  )
}
