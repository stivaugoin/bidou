import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, Group } from "@mantine/core";
import Link from "next/link";
import { ApiGetExpenses } from "../server/expenses";
import displayAmount from "../utils/displayAmount";
import { displayDate } from "../utils/displayDate";

interface RowProps {
  expense: ApiGetExpenses[number]["transactions"][number];
}
export default function ExpenseRow({ expense }: RowProps) {
  const { classes } = styles();

  return (
    <Link href={`/expenses/${expense.id}`}>
      <tr className={classes.row}>
        <td className={classes.cell}>{expense.Category.name}</td>
        <td className={classes.cell}>{expense.Category.Parent?.name || ""}</td>
        <td className={classes.cellAmount}>{displayDate(expense.date)}</td>
        <td className={classes.cell}>
          <Group position="right">
            {displayAmount(expense.amount)}{" "}
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </Group>
        </td>
      </tr>
    </Link>
  );
}

const styles = createStyles(() => ({
  cell: { width: "25%" },
  cellAmount: { fontVariantNumeric: "tabular-nums", width: "25%" },
  row: { cursor: "pointer" },
}));
