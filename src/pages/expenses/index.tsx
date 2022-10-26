import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "@mantine/core";
import Head from "next/head";
import CreateButton from "../../components/CreateButton";
import ExpensesList from "../../components/ExpensesList";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import { getTitle } from "../../utils/getTitle";

export default function Expenses() {
  return (
    <>
      <Head>
        <title>{getTitle("Expenses")}</title>
      </Head>

      <MainLayout>
        <PageHeader icon={faArrowTrendDown} title="Expenses">
          <CreateButton />
        </PageHeader>

        <Stack spacing="xl">
          {/* TODO: Add filters */}
          <ExpensesList />
        </Stack>
      </MainLayout>
    </>
  );
}
