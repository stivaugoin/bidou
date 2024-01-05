import { Grid, Text } from "@mantine/core";
import { inferRouterOutputs } from "@trpc/server";
import { TransactionRouter } from "../server/trpc/transactions";
import displayAmount from "../utils/displayAmount";
import { displayDate } from "../utils/displayDate";
import BadgeCategory from "./BadgeCategory";
import TransactionForm from "./TransactionForm";

interface Props {
  data: inferRouterOutputs<TransactionRouter>["getByFilters"]["transactions"][number];
  edit: boolean;
  onCloseEdit: () => void;
}

export function TransactionItem({ data, edit, onCloseEdit }: Props) {
  if (edit) {
    return <TransactionForm onClose={onCloseEdit} transaction={data} />;
  }

  return (
    <Grid gutter="sm" grow align="center">
      <Grid.Col order={1} span={{ base: 6, sm: 3 }}>
        <Text>{displayDate(data.date)}</Text>
      </Grid.Col>

      <Grid.Col order={{ base: 2, sm: 3 }} span={{ base: 6, sm: 3 }}>
        <Text ta="right">{displayAmount(data.amount, data.Category.type)}</Text>
      </Grid.Col>

      <Grid.Col order={{ base: 3, sm: 2 }} span={{ base: 12, sm: 6 }}>
        <BadgeCategory category={data.Category} />
      </Grid.Col>
    </Grid>
  );
}
