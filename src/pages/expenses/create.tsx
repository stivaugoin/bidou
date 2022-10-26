import FormCreateExpense from "../../components/FormCreateExpense";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";

export default function ExpensesCreate() {
  return (
    <MainLayout>
      <PageHeader backHref="/expenses" title="Create expense" />
      <FormCreateExpense />
    </MainLayout>
  );
}
