import { Loader, useMantineTheme } from "@mantine/core";
import useSWR from "swr";
import { ApiGetExpenses } from "../server/expenses";
import AlertFetchError from "./AlertFetchError";
import ExpenseRow from "./ExpenseRow";
import Table from "./Table";

export default function ExpensesList() {
  const theme = useMantineTheme();
  const { data, error } = useSWR<ApiGetExpenses>("/api/expenses");

  if (error) return <AlertFetchError />;
  if (!data) return <Loader />;

  return (
    <>
      {data?.map((value) => (
        <Table key={value.title}>
          <Table.TransactionHeader title={value.title} total={value.total} />
          <Table.Body>
            {value.transactions.map((transaction) => (
              <ExpenseRow key={transaction.id} expense={transaction} />
            ))}
          </Table.Body>
        </Table>
      ))}
    </>
  );
}
