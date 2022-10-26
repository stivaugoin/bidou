import { Loader, Table, useMantineTheme } from "@mantine/core";
import useSWR from "swr";
import { ApiGetIncomes } from "../server/incomes";
import { HEADER_HEIGHT } from "../utils/constant";
import displayAmount from "../utils/displayAmount";
import AlertFetchError from "./AlertFetchError";
import IncomeRow from "./IncomeRow";

export default function IncomesList() {
  const theme = useMantineTheme();
  const { data, error } = useSWR<ApiGetIncomes>("/api/incomes");

  if (error) return <AlertFetchError />;
  if (!data) return <Loader />;

  return (
    <>
      {data?.map((value) => (
        <Table key={value.title}>
          <thead
            style={{
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              position: "sticky",
              top: `${HEADER_HEIGHT}px`,
            }}
          >
            <tr>
              <th colSpan={2} style={{ width: "200px" }}>
                {value.title}
              </th>
              <th
                style={{
                  fontVariantNumeric: "tabular-nums lining-nums",
                  textAlign: "right",
                  width: "200px",
                }}
              >
                {displayAmount(value.total)}
              </th>
            </tr>
          </thead>
          <tbody>
            {value.transactions.map((transaction) => (
              <IncomeRow key={transaction.id} income={transaction} />
            ))}
          </tbody>
        </Table>
      ))}
    </>
  );
}
