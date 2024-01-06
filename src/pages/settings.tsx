import { Loader, Paper, Stack, Title } from "@mantine/core";
import AlertFetchError from "../components/AlertFetchError";
import MainLayout from "../components/MainLayout";
import PageHeader from "../components/PageHeader";
import { SettingsIncomesLastThreeMonths } from "../components/SettingsIncomesLastThreeMonths";
import { trpc } from "../lib/trpc";
import { MODULES } from "../utils/constant";

export default function SettingsPage() {
  const { data, error, isLoading } =
    trpc.dashboard.incomesLastThreeMonths.getSettings.useQuery();

  return (
    <MainLayout>
      <PageHeader title={MODULES.settings.label} />

      <Stack>
        <Title order={2}>Dashboard</Title>

        <Paper withBorder p="md">
          {error && <AlertFetchError message={error.message} />}
          {isLoading && <Loader />}
          {data && <SettingsIncomesLastThreeMonths settings={data} />}
        </Paper>
      </Stack>
    </MainLayout>
  );
}
