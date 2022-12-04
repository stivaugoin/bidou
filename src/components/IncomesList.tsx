import { Loader } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { trpc } from "../lib/trpc";
import AlertFetchError from "./AlertFetchError";
import TransactionList from "./TransactionList";

export default function IncomesList() {
  const { data, error, isLoading } = trpc.transactions.getByType.useQuery({
    type: CategoryType.Income,
  });

  if (error) return <AlertFetchError message={error.message} />;
  if (isLoading) return <Loader />;

  return (
    <>
      {data?.map((value) => (
        <TransactionList key={value.title} data={value} />
      ))}
    </>
  );
}
