import Head from "next/head";
import FormCreateExpense from "../../components/FormCreateExpense";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import { getTitle } from "../../utils/getTitle";

export default function ExpensesCreate() {
  return (
    <>
      <Head>
        <title>{getTitle("Create expense")}</title>
      </Head>
      <MainLayout>
        <PageHeader backHref="/expenses" title="Create expense" />
        <FormCreateExpense />
      </MainLayout>
    </>
  );
}
