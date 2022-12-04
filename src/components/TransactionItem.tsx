import { Accordion, SimpleGrid, Text } from "@mantine/core";
import { inferRouterOutputs } from "@trpc/server";
import { memo } from "react";
import { TransactionRouter } from "../server/trpc/transactions";
import displayAmount from "../utils/displayAmount";
import { displayDate } from "../utils/displayDate";
import BadgeCategory from "./BadgeCategory";

interface Props {
  // TODO: Improve this type. Do not use TransactionRouter.
  transaction: inferRouterOutputs<TransactionRouter>["getByCategoryId"][number]["transactions"][number];
}

export default memo(function TransactionItem({ transaction }: Props) {
  return (
    <Accordion.Item value={transaction.id}>
      <Accordion.Control>
        <SimpleGrid cols={3}>
          <Text>{displayDate(transaction.date)}</Text>
          <BadgeCategory category={transaction.Category} />
          <Text align="right">{displayAmount(transaction.amount)}</Text>
        </SimpleGrid>
      </Accordion.Control>

      <Accordion.Panel>FORM</Accordion.Panel>
    </Accordion.Item>
  );
});
