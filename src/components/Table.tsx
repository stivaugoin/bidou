import {
  Card,
  createStyles,
  Group,
  Table as MantineTable,
  Text,
  useMantineTheme,
} from "@mantine/core";
import displayAmount from "../utils/displayAmount";

function Table({ children }: { children: React.ReactNode }) {
  return (
    <Card shadow="sm" p={0} radius="md">
      {children}
    </Card>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();

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
      {children}
    </Card.Section>
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
    <TableHeader>
      <Group position="apart">
        <Text size="xl" weight={700}>
          {title}
        </Text>
        <Text className={classes.amount} size="xl" weight={700}>
          {displayAmount(total)}
        </Text>
      </Group>
    </TableHeader>
  );
}

function TableBody({
  children,
  highlightOnHover,
}: {
  children: React.ReactNode;
  highlightOnHover?: boolean;
}) {
  return (
    <Card.Section>
      <MantineTable highlightOnHover={highlightOnHover}>
        <tbody>{children}</tbody>
      </MantineTable>
    </Card.Section>
  );
}

const styles = createStyles(() => ({
  amount: { fontVariantNumeric: "tabular-nums lining-nums" },
}));

Table.Body = TableBody;
Table.Header = TableHeader;
Table.TransactionHeader = TransactionTableHeader;

export default Table;
