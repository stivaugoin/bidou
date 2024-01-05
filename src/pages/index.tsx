import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "@mantine/core";
import DashboardIncomes from "../components/DashboardIncomes";
import MainLayout from "../components/MainLayout";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    <MainLayout>
      <PageHeader icon={faHome} title="Dashboard" />

      <Stack gap="xl">
        <DashboardIncomes />
      </Stack>
    </MainLayout>
  );
}
