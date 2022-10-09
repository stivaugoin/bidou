import { Group } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import Link from "next/link";
import { ApiGetAllExpenses } from "../pages/api/expenses";
import displayAmount from "../utils/displayAmount";
import { displayDate } from "../utils/displayDate";

interface RowProps {
  expense: ApiGetAllExpenses[number]["transactions"][number];
}
export default function ExpenseRow({ expense }: RowProps) {
  return (
    <Link href={`/expenses/${expense.id}`}>
      <tr style={{ cursor: "pointer" }}>
        <td style={{ width: "25%" }}>{expense.Category.name}</td>
        <td style={{ width: "25%" }}>{expense.Category.Parent?.name || ""}</td>
        <td style={{ width: "25%" }}>{displayDate(expense.date)}</td>
        <td style={{ width: "25%" }}>
          <Group position="right">
            {displayAmount(expense.amount)} <IconChevronRight size={16} />
          </Group>
        </td>
      </tr>
    </Link>
  );
}
