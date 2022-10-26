import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import AlertFetchError from "../../components/AlertFetchError";
import FormUpdateIncome from "../../components/FormUpdateIncome";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import PageOptions from "../../components/PageOptions";
import notification from "../../lib/notification";
import { ApiGetIncome } from "../../server/incomes";

export default function IncomeView() {
  const router = useRouter();
  const { incomeId } = router.query;

  const { data, error } = useSWR<ApiGetIncome>(
    () => incomeId && `/api/incomes/${incomeId}`
  );

  const handleDelete = async () => {
    const result = await fetch(`/api/incomes/${incomeId}`, {
      method: "DELETE",
    });

    notification(result.ok ? "success" : "error");
    if (result.ok) router.push("/incomes");
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
