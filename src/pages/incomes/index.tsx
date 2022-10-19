import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { Button, Stack } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
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
          <Link href="/incomes/create" passHref>
            <Button component="a" id="createBtn">
              Create
            </Button>
          </Link>
        </PageHeader>

        <Stack spacing="xl">
          {/* TODO: Add filters */}
          <IncomesList />
        </Stack>
      </MainLayout>
    </>
  );
}
