import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import AlertFetchError from "../../components/AlertFetchError";
import FormUpdateTransaction from "../../components/FormUpdateTransaction";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import PageOptions from "../../components/PageOptions";
import notification from "../../lib/notification";
import { trpc } from "../../lib/trpc";

export default function IncomeView() {
  const router = useRouter();
  const incomeId = router.query.incomeId as string;
  const mutationDelete = trpc.transactions.delete.useMutation();

  const { data, error, isLoading } =
    trpc.transactions.getById.useQuery(incomeId);

  const handleDelete = async () => {
    try {
      await mutationDelete.mutateAsync(incomeId);
      notification("success");
      router.back();
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
      {isLoading && <Loader />}
      {data && <FormUpdateTransaction transaction={data} />}
    </MainLayout>
  );
}
