import { Loader, Pagination } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../lib/trpc";
import AlertFetchError from "./AlertFetchError";
import TransactionsMonth from "./TransactionsMonth";

interface Props {
  type: CategoryType;
}

export default function Transactions({ type }: Props) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data, error, isLoading } = trpc.transactions.getByFilters.useQuery({
    page,
    type: router.query.type as CategoryType,
  });

  if (error) return <AlertFetchError message={error.message} />;
  if (isLoading) return <Loader />;

  return (
    <>
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
