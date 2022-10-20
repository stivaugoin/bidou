import { Loader } from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import AlertFetchError from "../../components/AlertFetchError";
import DeleteButton from "../../components/DeleteButton";
import FormUpdateIncome from "../../components/FormUpdateIncome";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import notification from "../../lib/notification";
import { ApiGetIncome } from "../../server/incomes";
import { getTitle } from "../../utils/getTitle";

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
    <>
      <Head>
        <title>{getTitle("Edit income")}</title>
      </Head>
      <MainLayout>
        <PageHeader backHref="/incomes" title="Edit income">
          <DeleteButton onConfirmDelete={handleDelete} />
        </PageHeader>

        {error && <AlertFetchError />}
        {!error && !data && <Loader />}
        {!error && data && <FormUpdateIncome income={data} />}
      </MainLayout>
    </>
  );
}
