import Head from "next/head";
import FormCreateIncome from "../../components/FormCreateIncome";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import { getTitle } from "../../utils/getTitle";

export default function IncomesCreate() {
  return (
    <>
      <Head>
        <title>{getTitle("Create income")}</title>
      </Head>
      <MainLayout>
        <PageHeader backHref="/incomes" title="Create income" />
        <FormCreateIncome />
      </MainLayout>
    </>
  );
}
