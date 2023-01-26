import { Badge, Group, Stack, Title } from "@mantine/core";
import { inferRouterOutputs } from "@trpc/server";
import { memo, useState } from "react";
import { TransactionRouter } from "../server/trpc/transactions";
import displayAmount from "../utils/displayAmount";
import { List } from "./List";
import { TransactionItem } from "./TransactionItem";
import { TransactionMenu } from "./TransactionMenu";

type Props = {
  transactions: inferRouterOutputs<TransactionRouter>["getByFilters"]["transactionsByMonth"][number];
};

export default memo(function TransactionsByMonth({ transactions }: Props) {
  const [transactionEditIds, setTransactionEditIds] = useState<string[]>([]);

  function handleOpenEdit(transactionId: string) {
    setTransactionEditIds((ids) => [...ids, transactionId]);
  }

  function handleCloseEdit(transactionId: string) {
    setTransactionEditIds((ids) => ids.filter((id) => id !== transactionId));
  }

  return (
    <Stack spacing={0} mb="xl">
      <Group align="center" position="apart" mb="md">
        <Title order={3}>{transactions.title}</Title>
        <Badge color={transactions.total < 0 ? "red" : "green"} size="xl">
          {displayAmount(transactions.total)}
        </Badge>
      </Group>

      <List
        data={transactions.transactions}
        renderItem={(transaction) => (
          <TransactionItem
            data={transaction}
            edit={transactionEditIds.includes(transaction.id)}
            onCloseEdit={() => handleCloseEdit(transaction.id)}
          />
        )}
        renderMenu={(transaction) => {
          if (transactionEditIds.includes(transaction.id)) return null;
          return (
            <TransactionMenu
              onClickEdit={handleOpenEdit}
              transaction={transaction}
            />
          );
        }}
      />
    </Stack>
  );
});
