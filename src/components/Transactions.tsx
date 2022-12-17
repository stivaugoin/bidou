import { Loader, Pagination } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../lib/trpc";
import AlertFetchError from "./AlertFetchError";
import TransactionsMonth from "./TransactionsMonth";

interface Props {
  type: CategoryType;
}

export default function Transactions({ type }: Props) {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = trpc.transactions.getByType.useQuery({
    page,
    type,
  });

  if (error) return <AlertFetchError message={error.message} />;
  if (isLoading) return <Loader />;

  return (
    <>
      {/* TODO: Add filters */}
      {data.transactions.map((transactions) => (
        <TransactionsMonth
          key={transactions.title}
          transactions={transactions}
          type={type}
        />
      ))}

      <Pagination onChange={setPage} page={page} total={data.totalPage} />
    </>
  );
}
