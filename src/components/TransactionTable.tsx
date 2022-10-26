import {
  Card,
  createStyles,
  Group,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import displayAmount from "../utils/displayAmount";

function TransactionTable({ children }: { children: React.ReactNode }) {
  return (
    <Card shadow="sm" p={0} radius="md">
      {children}
    </Card>
  );
}

function TransactionTableHeader({
  title,
  total,
}: {
  title: string;
  total: number;
}) {
  const theme = useMantineTheme();
  const { classes } = styles();

  return (
    <Card.Section
      p="md"
      sx={{
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      }}
    >
      <Group position="apart">
        <Text size="xl" weight={700}>
          {title}
        </Text>
        <Text className={classes.amount} size="xl" weight={700}>
          {displayAmount(total)}
        </Text>
      </Group>
    </Card.Section>
  );
}

function TransactionTableBody({ children }: { children: React.ReactNode }) {
  return (
    <Card.Section>
      <Table>
        <tbody>{children}</tbody>
      </Table>
    </Card.Section>
  );
}

const styles = createStyles(() => ({
  amount: { fontVariantNumeric: "tabular-nums lining-nums" },
}));

TransactionTable.Header = TransactionTableHeader;
TransactionTable.Body = TransactionTableBody;

export default TransactionTable;
