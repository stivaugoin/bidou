import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { Loader, Stack } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import AlertFetchError from "../../components/AlertFetchError";
import CreateButton from "../../components/CreateButton";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import TransactionList from "../../components/TransactionList";
import { trpc } from "../../lib/trpc";

export default function ExpensesRoot() {
  return (
    <MainLayout>
      <PageHeader icon={faArrowTrendDown} title="Expenses">
        <CreateButton />
      </PageHeader>

      <Stack spacing="xl">
        <Expenses />
      </Stack>
    </MainLayout>
  );
}

function Expenses() {
  const { data, error, isLoading } = trpc.transactions.getByType.useQuery({
    type: CategoryType.Expense,
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
