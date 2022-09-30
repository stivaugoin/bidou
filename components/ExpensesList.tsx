import { Loader, Table, useMantineTheme } from "@mantine/core";
import useSWR, { Fetcher } from "swr";
import { ApiGetAllExpenses } from "../pages/api/expenses";
import { HEADER_HEIGHT } from "../utils/constant";
import displayAmount from "../utils/displayAmount";
import ExpenseRow from "./ExpenseRow";

const fetcher: Fetcher<ApiGetAllExpenses, string> = (url) =>
  fetch(url).then((res) => res.json());

export default function ExpensesList() {
  const theme = useMantineTheme();
  const { data, error } = useSWR("/api/expenses", fetcher);
  const loading = !data && !error;

  if (error) {
    return (
      <div>
        <p>Failed to load</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  if (loading) return <Loader />;

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
              <th colSpan={3} style={{ width: "200px" }}>
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
              <ExpenseRow key={transaction.id} expense={transaction} />
            ))}
          </tbody>
        </Table>
      ))}
    </>
  );
}
