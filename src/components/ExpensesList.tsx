import { Loader, Table, useMantineTheme } from "@mantine/core";
import useSWR from "swr";
import { ApiGetExpenses } from "../server/expenses";
import { HEADER_HEIGHT } from "../utils/constant";
import displayAmount from "../utils/displayAmount";
import AlertFetchError from "./AlertFetchError";
import ExpenseRow from "./ExpenseRow";

export default function ExpensesList() {
  const theme = useMantineTheme();
  const { data, error } = useSWR<ApiGetExpenses>("/api/expenses");

  if (error) return <AlertFetchError />;
  if (!data) return <Loader />;

  return (
    <>
      {data?.map((value) => (
        <Table fontSize="md" highlightOnHover key={value.title}>
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
              <th />
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
              <ExpenseRow key={transaction.id} expense={transaction} />
            ))}
          </tbody>
        </Table>
      ))}
    </>
  );
}
