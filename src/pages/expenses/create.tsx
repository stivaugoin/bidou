import { CategoryType } from "@prisma/client";
import FormCreateTransaction from "../../components/FormCreateTransaction";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";

export default function ExpensesCreate() {
  return (
    <MainLayout>
      <PageHeader backHref="/expenses" title="Create expense" />
      <FormCreateTransaction type={CategoryType.Expense} />
    </MainLayout>
  );
}
