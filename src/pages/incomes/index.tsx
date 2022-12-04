import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { Loader, Stack } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import AlertFetchError from "../../components/AlertFetchError";
import CreateButton from "../../components/CreateButton";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import TransactionList from "../../components/TransactionList";
import { trpc } from "../../lib/trpc";

export default function IncomesRoot() {
  return (
    <MainLayout>
      <PageHeader icon={faArrowTrendUp} title="Incomes">
        <CreateButton />
      </PageHeader>

      <Stack spacing="xl">
        <Incomes />
      </Stack>
    </MainLayout>
  );
}

function Incomes() {
  const { data, error, isLoading } = trpc.transactions.getByType.useQuery({
    type: CategoryType.Income,
  });

  if (error) return <AlertFetchError message={error.message} />;
  if (isLoading) return <Loader />;

  return (
    <>
      {data?.map((value) => (
        <TransactionList key={value.title} data={value} />
      ))}
    </>
  );
}
