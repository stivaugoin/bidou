import { Stack } from "@mantine/core";
import DashboardIncomes from "../components/DashboardIncomes";
import MainLayout from "../components/MainLayout";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    <MainLayout>
      <PageHeader title="Dashboard" />

      <Stack gap="xl">
        <DashboardIncomes />
      </Stack>
    </MainLayout>
  );
}
