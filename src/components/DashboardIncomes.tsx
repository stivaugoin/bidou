import { Box, Loader, SimpleGrid, Text } from "@mantine/core";
import { trpc } from "../lib/trpc";
import AlertFetchError from "./AlertFetchError";
import StatsIncomeLastThreeMonths from "./StatsIncomeLastThreeMonths";

export default function DashboardIncomes() {
  const { data, error, isLoading } =
    trpc.dashboard.incomesLastThreeMonths.getData.useQuery();

  if (error) return <AlertFetchError />;
  if (isLoading) return <Loader />;
  if (!data)
    return (
      <Box p="md" ta="center">
        <Text c="dimmed" fs="italic">
          No data to display
        </Text>
        <Text c="dimmed" fs="italic">
          Go to settings page to configure your dashboard
        </Text>
      </Box>
    );

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      {data.map(({ difference, id, months, title }) => (
        <StatsIncomeLastThreeMonths
          key={id}
          difference={difference}
          months={months}
          title={title}
        />
      ))}
    </SimpleGrid>
  );
}
