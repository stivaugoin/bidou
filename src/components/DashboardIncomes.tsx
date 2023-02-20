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
      <Box p="md" sx={{ textAlign: "center" }}>
        <Text color="dimmed" italic>
          No data to display
        </Text>
        <Text color="dimmed" italic>
          Go to settings page to configure your dashboard
        </Text>
      </Box>
    );

  return (
    <SimpleGrid breakpoints={[{ cols: 1, maxWidth: "md" }]} cols={data.length}>
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
