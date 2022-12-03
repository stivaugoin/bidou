import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import CreateButton from "../../components/CreateButton";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import TransactionList from "../../components/TransactionList";

export default function Incomes() {
  return (
    <MainLayout>
      <PageHeader icon={faArrowTrendUp} title="Incomes">
        <CreateButton />
      </PageHeader>

      <Stack spacing="xl">
        {/* TODO: Add filters */}
        <TransactionList type={CategoryType.Income} />
      </Stack>
    </MainLayout>
  );
}
