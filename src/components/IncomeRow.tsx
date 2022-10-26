import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, Group } from "@mantine/core";
import Link from "next/link";
import { ApiGetIncomes } from "../server/incomes";
import displayAmount from "../utils/displayAmount";
import { displayDate } from "../utils/displayDate";

interface RowProps {
  income: ApiGetIncomes[number]["transactions"][number];
}
export default function IncomeRow({ income }: RowProps) {
  const { classes } = styles();

  return (
    <Link href={`/incomes/${income.id}`}>
      <tr className={classes.row}>
        <td className={classes.cell}>{income.Category.name}</td>
        <td className={classes.cell}>{displayDate(income.date)}</td>
        <td className={classes.cellAmount}>
          <Group position="right">
            {displayAmount(income.amount)}{" "}
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </Group>
        </td>
      </tr>
    </Link>
  );
}

const styles = createStyles(() => ({
  cell: { width: "33%" },
  cellAmount: { fontVariantNumeric: "tabular-nums", width: "33%" },
  row: { cursor: "pointer" },
}));
