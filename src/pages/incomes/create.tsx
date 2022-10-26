import FormCreateIncome from "../../components/FormCreateIncome";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";

export default function IncomesCreate() {
  return (
    <MainLayout>
      <PageHeader backHref="/incomes" title="Create income" />
      <FormCreateIncome />
    </MainLayout>
  );
}
