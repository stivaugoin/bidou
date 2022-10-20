import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group } from "@mantine/core";
import Link from "next/link";
import { ApiGetIncomes } from "../server/incomes";
import displayAmount from "../utils/displayAmount";
import { displayDate } from "../utils/displayDate";

interface RowProps {
  income: ApiGetIncomes[number]["transactions"][number];
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
            {displayAmount(income.amount)}{" "}
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </Group>
        </td>
      </tr>
    </Link>
  );
}
