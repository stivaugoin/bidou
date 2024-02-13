import Link from "next/link";
import { getTransactions } from "./getTransactions";

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div>
      <h1>Transactions</h1>
      <Link href="transactions/new">Create new transaction</Link>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date.toISOString()}</td>
              <td>{transaction.category?.name || "Uncategorized"}</td>
              <td style={{ textAlign: "right" }}>
                {(transaction.amount / 100).toFixed(2)} $
              </td>
              <td>
                <Link href={`/transactions/${transaction.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
