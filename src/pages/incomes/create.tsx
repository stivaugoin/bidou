import { CategoryType } from "@prisma/client";
import FormCreateTransaction from "../../components/FormCreateTransaction";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";

export default function IncomesCreate() {
  return (
    <MainLayout>
      <PageHeader backHref="/incomes" title="Create income" />
      <FormCreateTransaction type={CategoryType.Income} />
    </MainLayout>
  );
}
