import { Loader, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ApiGetCategoryExpenses } from "../server/categories";
import AlertFetchError from "./AlertFetchError";
import ExpenseRow from "./ExpenseRow";
import Table from "./Table";

export default function CategoryTransactions() {
  const router = useRouter();
  const categoryId = router.query.categoryId as string;

  const { data, error } = useSWR<ApiGetCategoryExpenses>(
    categoryId && `/api/categories/${categoryId}/expenses`
  );

  if (error) return <AlertFetchError />;
  if (!data) return <Loader />;

  return (
    <Stack spacing="xl">
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
    </Stack>
  );
}
