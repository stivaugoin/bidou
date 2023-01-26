import { SimpleGrid, Text } from "@mantine/core";
import { inferRouterOutputs } from "@trpc/server";
import { TransactionRouter } from "../server/trpc/transactions";
import displayAmount from "../utils/displayAmount";
import { displayDate } from "../utils/displayDate";
import BadgeCategory from "./BadgeCategory";
import TransactionForm from "./TransactionForm";

interface Props {
  data: inferRouterOutputs<TransactionRouter>["getByFilters"]["transactionsByMonth"][number]["transactions"][number];
  edit: boolean;
  onCloseEdit: () => void;
}

export function TransactionItem({ data, edit, onCloseEdit }: Props) {
  if (edit) {
    return <TransactionForm onClose={onCloseEdit} transaction={data} />;
  }

  return (
    <SimpleGrid cols={3}>
      <Text>{displayDate(data.date)}</Text>
      <BadgeCategory category={data.Category} />
      <Text align="right">
        {displayAmount(data.amount, data.Category.type)}
      </Text>
    </SimpleGrid>
  );
}
