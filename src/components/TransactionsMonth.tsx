import { Accordion, Badge, Group, Stack, Title } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { memo, useState } from "react";
import { TransactionRouter } from "../server/trpc/transactions";
import displayAmount from "../utils/displayAmount";
import TransactionItem from "./TransactionItem";

type Props = {
  transactions: inferRouterOutputs<TransactionRouter>["getByFilters"]["transactions"][number];
  type: CategoryType;
};

export default memo(function TransactionsMonth({ transactions, type }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <Stack key={transactions.title} spacing={0} mb="xl">
      <Group align="center" position="apart" mb="md">
        <Title order={3}>{transactions.title}</Title>
        <Badge color={transactions.total < 0 ? "red" : "green"} size="xl">
          {displayAmount(transactions.total)}
        </Badge>
      </Group>

      <Accordion
        onChange={setActiveId}
        value={activeId}
        variant="contained"
        radius="md"
      >
        {transactions.transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            onClose={() => setActiveId(null)}
            transaction={transaction}
          />
        ))}
      </Accordion>
    </Stack>
  );
});
