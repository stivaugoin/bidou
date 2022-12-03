import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, Group } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import Link from "next/link";
import { TransactionRouter } from "../server/trpc/transactions";
import displayAmount from "../utils/displayAmount";
import { displayDate } from "../utils/displayDate";
import BadgeCategory from "./BadgeCategory";

interface RowProps {
  transaction: inferRouterOutputs<TransactionRouter>["getByType"][number]["transactions"][number];
}

export default function TransactionItem({ transaction }: RowProps) {
  const { classes } = styles();

  const section =
    transaction.type === CategoryType.Expense ? "expenses" : "incomes";

  return (
    <Link href={`/${section}/${transaction.id}`}>
      <tr className={classes.row}>
        <td className={classes.cellAmount}>{displayDate(transaction.date)}</td>
        <td className={classes.cell}>
          <BadgeCategory category={transaction.Category} />
        </td>
        <td className={classes.cell}>
          <Group position="right">
            {displayAmount(transaction.amount)}{" "}
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
