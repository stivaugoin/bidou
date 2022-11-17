import { Loader } from "@mantine/core";
import useSWR from "swr";
import { ApiGetIncomes } from "../server/incomes";
import AlertFetchError from "./AlertFetchError";
import IncomeRow from "./IncomeRow";
import Table from "./Table";

export default function IncomesList() {
  const { data, error } = useSWR<ApiGetIncomes>("/api/incomes");

  if (error) return <AlertFetchError />;
  if (!data) return <Loader />;

  return (
    <>
      {data?.map((value) => (
        <Table key={value.title}>
          <Table.TransactionHeader title={value.title} total={value.total} />
          <Table.Body>
            {value.transactions.map((transaction) => (
              <IncomeRow key={transaction.id} income={transaction} />
            ))}
          </Table.Body>
        </Table>
      ))}
    </>
  );
}
