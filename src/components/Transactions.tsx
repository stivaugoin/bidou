import { Loader, Pagination } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../lib/trpc";
import AlertFetchError from "./AlertFetchError";
import TransactionsByMonth from "./TransactionsByMonth";

export default function Transactions() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data, error, isLoading } = trpc.transactions.getByFilters.useQuery({
    categoryId: router.query.categoryId as string,
    page,
    type: router.query.type as CategoryType,
  });

  if (error) return <AlertFetchError message={error.message} />;
  if (isLoading) return <Loader />;

  return (
    <>
      {data.transactionsByMonth.map((transactions) => (
        <TransactionsByMonth
          key={transactions.title}
          transactions={transactions}
        />
      ))}

      <Pagination onChange={setPage} page={page} total={data.totalPage} />
    </>
  );
}
