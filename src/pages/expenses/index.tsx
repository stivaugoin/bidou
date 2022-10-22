import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { Button, Stack } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
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
        <PageHeader icon={faArrowTrendUp} title="Expenses">
          <Link href="/expenses/create" passHref>
            <Button component="a" id="createBtn">
              Create
            </Button>
          </Link>
        </PageHeader>

        <Stack spacing="xl">
          {/* TODO: Add filters */}
          <ExpensesList />
        </Stack>
      </MainLayout>
    </>
  );
}
