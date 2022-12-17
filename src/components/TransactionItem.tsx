import { Accordion, SimpleGrid, Text } from "@mantine/core";
import { inferRouterOutputs } from "@trpc/server";
import { memo } from "react";
import { TransactionRouter } from "../server/trpc/transactions";
import displayAmount from "../utils/displayAmount";
import { displayDate } from "../utils/displayDate";
import BadgeCategory from "./BadgeCategory";
import TransactionForm from "./TransactionForm";

interface Props {
  onClose: () => void;
  // TODO: Improve this type. Use Transaction type from @prisma/client.
  transaction: inferRouterOutputs<TransactionRouter>["getByType"]["transactions"][number]["transactions"][number];
}

export default memo(function TransactionItem({ onClose, transaction }: Props) {
  return (
    <Accordion.Item value={transaction.id}>
      <Accordion.Control>
        <SimpleGrid cols={3}>
          <Text>{displayDate(transaction.date)}</Text>
          <BadgeCategory category={transaction.Category} />
          <Text align="right">{displayAmount(transaction.amount)}</Text>
        </SimpleGrid>
      </Accordion.Control>

      <Accordion.Panel>
        <TransactionForm
          onClose={onClose}
          transaction={transaction}
          type={transaction.type}
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
});
