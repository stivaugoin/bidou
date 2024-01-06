import { Box, Button, Collapse, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MainLayout from "../components/MainLayout";
import PageHeader from "../components/PageHeader";
import TransactionForm from "../components/TransactionForm";
import Transactions from "../components/Transactions";
import { TransactionsFilters } from "../components/TransactionsFilters";

export default function TransactionsPage() {
  const [open, { toggle }] = useDisclosure(false);

  return (
    <MainLayout>
      <PageHeader title="Transactions">
        <Button disabled={open} id="createBtn" onClick={toggle} size="sm">
          Add
        </Button>
      </PageHeader>

      <Collapse in={open}>
        <Box mb="xl">
          <TransactionForm onClose={toggle} />
        </Box>
      </Collapse>

      <Stack gap="xl">
        <TransactionsFilters />
        <Transactions />
      </Stack>
    </MainLayout>
  );
}
