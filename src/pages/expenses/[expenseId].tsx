import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import AlertFetchError from "../../components/AlertFetchError";
import FormUpdateExpense from "../../components/FormUpdateExpense";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import PageOptions from "../../components/PageOptions";
import notification from "../../lib/notification";
import { ApiGetExpense, ApiGetExpenses } from "../../server/expenses";

export default function ExpenseView() {
  const router = useRouter();
  const { expenseId } = router.query;

  const { data, error } = useSWR<ApiGetExpense>(
    () => expenseId && `/api/expenses/${expenseId}`
  );
  const { data: expenses } = useSWR<ApiGetExpenses>("/api/expenses");
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    try {
      await mutate(`/api/expenses`, deleteExpense(expenseId as string), {
        populateCache: () => {
          return expenses?.map((expense) => {
            return expense.transactions.filter(
              (transaction) => transaction.id !== expenseId
            );
          });
        },
      });

      notification("success");
      router.push("/expenses");
    } catch (error) {
      console.error(error);
      notification("error");
    }
  };

  return (
    <MainLayout>
      <PageHeader backHref="/expenses" title="Edit expense">
        <PageOptions onConfirmDelete={handleDelete} />
      </PageHeader>

      {error && <AlertFetchError />}
      {!error && !data && <Loader />}
      {!error && data && <FormUpdateExpense expense={data} />}
    </MainLayout>
  );
}

async function deleteExpense(expenseId: string) {
  const response = await fetch(`/api/expenses/${expenseId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete expense");
  return response.json();
}
