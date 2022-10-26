import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Stack, Text } from "@mantine/core";
import MainLayout from "../components/MainLayout";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    <MainLayout>
      <PageHeader icon={faHome} title="Dashboard" />

      <Stack spacing="xl">
        <Text>Dashboard</Text>
      </Stack>
    </MainLayout>
  );
}
