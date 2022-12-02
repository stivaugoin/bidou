import { Loader } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { trpc } from "../lib/trpc";
import AlertFetchError from "./AlertFetchError";
import Table from "./Table";
import TransactionItem from "./TransactionItem";

interface Props {
  type: CategoryType;
}

export default function TransactionList({ type }: Props) {
  const { data, error, isLoading } = trpc.transactions.getByType.useQuery({
    type,
  });

  if (error) return <AlertFetchError message={error.message} />;
  if (isLoading) return <Loader />;

  return (
    <>
      {data?.map((value) => (
        <Table key={value.title}>
          <Table.TransactionHeader title={value.title} total={value.total} />
          <Table.Body>
            {value.transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </Table.Body>
        </Table>
      ))}
    </>
  );
}
