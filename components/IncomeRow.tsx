import { Group } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import Link from "next/link";
import { ApiGetAllIncomes } from "../pages/api/incomes";
import displayAmount from "../utils/displayAmount";
import { displayDate } from "../utils/displayDate";

interface RowProps {
  income: ApiGetAllIncomes[number]["transactions"][number];
}
export default function IncomeRow({ income }: RowProps) {
  return (
    <Link href={`/incomes/${income.id}`}>
      <tr style={{ cursor: "pointer" }}>
        <td style={{ width: "33%" }}>{income.Category.name}</td>
        <td style={{ width: "33%" }}>{displayDate(income.date)}</td>
        <td
          style={{
            fontVariantNumeric: "tabular-nums",
            width: "33%",
          }}
        >
          <Group position="right">
            {displayAmount(income.amount)} <IconChevronRight size={16} />
          </Group>
        </td>
      </tr>
    </Link>
  );
}
