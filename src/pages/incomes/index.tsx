import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "@mantine/core";
import Head from "next/head";
import CreateButton from "../../components/CreateButton";
import IncomesList from "../../components/IncomesList";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import { getTitle } from "../../utils/getTitle";

export default function Incomes() {
  return (
    <>
      <Head>
        <title>{getTitle("Incomes")}</title>
      </Head>

      <MainLayout>
        <PageHeader icon={faArrowTrendUp} title="Incomes">
          <CreateButton />
        </PageHeader>

        <Stack spacing="xl">
          {/* TODO: Add filters */}
          <IncomesList />
        </Stack>
      </MainLayout>
    </>
  );
}
