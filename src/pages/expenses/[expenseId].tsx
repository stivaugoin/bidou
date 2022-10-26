import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import AlertFetchError from "../../components/AlertFetchError";
import FormUpdateExpense from "../../components/FormUpdateExpense";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import PageOptions from "../../components/PageOptions";
import notification from "../../lib/notification";
import { ApiGetExpense } from "../../server/expenses";

export default function ExpenseView() {
  const router = useRouter();
  const { expenseId } = router.query;

  const { data, error } = useSWR<ApiGetExpense>(
    () => expenseId && `/api/expenses/${expenseId}`
  );

  const handleDelete = async () => {
    const result = await fetch(`/api/expenses/${expenseId}`, {
      method: "DELETE",
    });

    notification(result.ok ? "success" : "error");
    if (result.ok) router.push("/expenses");
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
