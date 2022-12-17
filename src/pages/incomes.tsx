import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Collapse, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CategoryType } from "@prisma/client";
import MainLayout from "../components/MainLayout";
import PageHeader from "../components/PageHeader";
import TransactionForm from "../components/TransactionForm";
import Transactions from "../components/Transactions";

export default function IncomesRoot() {
  const [open, { toggle }] = useDisclosure(false);

  return (
    <MainLayout>
      <PageHeader icon={faArrowTrendUp} title="Incomes">
        <Button disabled={open} id="createBtn" onClick={toggle}>
          Create
        </Button>
      </PageHeader>

      <Collapse in={open}>
        <Card>
          <TransactionForm onClose={toggle} type={CategoryType.Income} />
        </Card>
      </Collapse>

      <Stack spacing="xl">
        <Transactions type={CategoryType.Income} />
      </Stack>
    </MainLayout>
  );
}
