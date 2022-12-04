import { Accordion, Badge, Group, Stack, Title } from "@mantine/core";
import { inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import { TransactionRouter } from "../server/trpc/transactions";
import displayAmount from "../utils/displayAmount";
import TransactionItem from "./TransactionItem";

interface Props {
  data: inferRouterOutputs<TransactionRouter>["getByCategoryId"][number];
}

export default function TransactionList({ data }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <Stack key={data.title} spacing={0} mt="xl">
      <Group align="center" position="apart" mb="md" mx="md">
        <Title order={3}>{data.title}</Title>
        <Badge color="red" size="xl">
          {displayAmount(data.total)}
        </Badge>
      </Group>

      <Accordion onChange={setActiveId} value={activeId} variant="contained">
        {data.transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </Accordion>
    </Stack>
  );
}
