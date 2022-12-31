import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { Button, Collapse, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CategoryType } from "@prisma/client";
import MainLayout from "../components/MainLayout";
import PageHeader from "../components/PageHeader";
import TransactionForm from "../components/TransactionForm";
import Transactions from "../components/Transactions";

export default function ExpensesPage() {
  const [open, { toggle }] = useDisclosure(false);

  return (
    <MainLayout>
      <PageHeader icon={faArrowTrendDown} title="Expenses">
        <Button disabled={open} id="createBtn" onClick={toggle}>
          Create
        </Button>
      </PageHeader>

      <Collapse in={open}>
        <TransactionForm onClose={toggle} type={CategoryType.Expense} />
      </Collapse>

      <Stack spacing="xl">
        <Transactions type={CategoryType.Expense} />
      </Stack>
    </MainLayout>
  );
}
