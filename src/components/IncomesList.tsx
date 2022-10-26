import { Loader, useMantineTheme } from "@mantine/core";
import useSWR from "swr";
import { ApiGetIncomes } from "../server/incomes";
import AlertFetchError from "./AlertFetchError";
import IncomeRow from "./IncomeRow";
import TransactionTable from "./TransactionTable";

export default function IncomesList() {
  const theme = useMantineTheme();
  const { data, error } = useSWR<ApiGetIncomes>("/api/incomes");

  if (error) return <AlertFetchError />;
  if (!data) return <Loader />;

  return (
    <>
      {data?.map((value) => (
        <TransactionTable key={value.title}>
          <TransactionTable.Header title={value.title} total={value.total} />
          <TransactionTable.Body>
            {value.transactions.map((transaction) => (
              <IncomeRow key={transaction.id} income={transaction} />
            ))}
          </TransactionTable.Body>
        </TransactionTable>
      ))}
    </>
  );
}
