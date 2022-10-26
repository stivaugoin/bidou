import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import AlertFetchError from "../../components/AlertFetchError";
import FormUpdateIncome from "../../components/FormUpdateIncome";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import PageOptions from "../../components/PageOptions";
import notification from "../../lib/notification";
import { ApiGetIncome, ApiGetIncomes } from "../../server/incomes";

export default function IncomeView() {
  const router = useRouter();
  const { incomeId } = router.query;

  const { data, error } = useSWR<ApiGetIncome>(
    () => incomeId && `/api/incomes/${incomeId}`
  );
  const { data: incomes } = useSWR<ApiGetIncomes>("/api/incomes");
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    try {
      await mutate(`/api/incomes`, deleteIncome(incomeId as string), {
        populateCache: () => {
          return incomes?.map((income) => {
            return income.transactions.filter(
              (transaction) => transaction.id !== incomeId
            );
          });
        },
      });

      notification("success");
      router.push("/incomes");
    } catch (error) {
      console.error(error);
      notification("error");
    }
  };

  return (
    <MainLayout>
      <PageHeader backHref="/incomes" title="Edit income">
        <PageOptions onConfirmDelete={handleDelete} />
      </PageHeader>

      {error && <AlertFetchError />}
      {!error && !data && <Loader />}
      {!error && data && <FormUpdateIncome income={data} />}
    </MainLayout>
  );
}

async function deleteIncome(incomeId: string) {
  const response = await fetch(`/api/incomes/${incomeId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}
