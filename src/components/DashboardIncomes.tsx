import { Loader, SimpleGrid } from "@mantine/core";
import useSWR from "swr";
import { ApiGetDashboardIncomes } from "../server/dashboard";
import AlertFetchError from "./AlertFetchError";
import StatsIncomeLastThreeMonths from "./StatsIncomeLastThreeMonths";

export default function DashboardIncomes() {
  const { data, error } = useSWR<ApiGetDashboardIncomes>(
    "/api/dashboard/incomes"
  );

  if (error) return <AlertFetchError />;
  if (!data) return <Loader />;

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
