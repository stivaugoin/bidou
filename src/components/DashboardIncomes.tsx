import { Loader, SimpleGrid } from "@mantine/core";
import { trpc } from "../lib/trpc";
import AlertFetchError from "./AlertFetchError";
import StatsIncomeLastThreeMonths from "./StatsIncomeLastThreeMonths";

export default function DashboardIncomes() {
  const { data, error, isLoading } =
    trpc.dashboard.incomesLastThreeMonths.getData.useQuery();

  if (error) return <AlertFetchError />;
  if (isLoading) return <Loader />;
  if (!data) return null;

  return (
    <SimpleGrid cols={data.length}>
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
