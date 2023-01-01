import { Accordion, SimpleGrid, Text } from "@mantine/core";
import { CategoryType, Transaction } from "@prisma/client";
import { ComponentProps, memo } from "react";
import displayAmount from "../utils/displayAmount";
import { displayDate } from "../utils/displayDate";
import BadgeCategory from "./BadgeCategory";
import TransactionForm from "./TransactionForm";

interface Props {
  onClose: () => void;
  transaction: Omit<Transaction, "createdAt"> & {
    Category: ComponentProps<typeof BadgeCategory>["category"];
  };
}

export default memo(function TransactionItem({ onClose, transaction }: Props) {
  const amountMultiplier =
    transaction.Category.type === CategoryType.Expense ? -1 : 1;

  return (
    <Accordion.Item value={transaction.id}>
      <Accordion.Control>
        <SimpleGrid cols={3}>
          <Text>{displayDate(transaction.date)}</Text>
          <BadgeCategory category={transaction.Category} />
          <Text align="right">
            {displayAmount(transaction.amount * amountMultiplier)}
          </Text>
        </SimpleGrid>
      </Accordion.Control>

      <Accordion.Panel>
        <TransactionForm onClose={onClose} transaction={transaction} />
      </Accordion.Panel>
    </Accordion.Item>
  );
});
