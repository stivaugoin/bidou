import Link from "next/link";

export default function TransactionsPage() {
  return (
    <div>
      <h1>Transactions</h1>
      <Link href="transactions/new">Create new transaction</Link>
    </div>
  );
}
