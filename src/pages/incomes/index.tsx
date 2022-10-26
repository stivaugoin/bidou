import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "@mantine/core";
import CreateButton from "../../components/CreateButton";
import IncomesList from "../../components/IncomesList";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";

export default function Incomes() {
  return (
    <MainLayout>
      <PageHeader icon={faArrowTrendUp} title="Incomes">
        <CreateButton />
      </PageHeader>

      <Stack spacing="xl">
        {/* TODO: Add filters */}
        <IncomesList />
      </Stack>
    </MainLayout>
  );
}
