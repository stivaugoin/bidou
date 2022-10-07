import { Button, Stack } from "@mantine/core";
import { Provider } from "@prisma/client";
import { IconBuildingCommunity } from "@tabler/icons";
import Head from "next/head";
import Link from "next/link";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import ProvidersList from "../../components/ProvidersList";
import { getTitle } from "../../utils/getTitle";

export default function Providers({ providers }: { providers: Provider[] }) {
  return (
    <>
      <Head>
        <title>{getTitle("Providers")}</title>
      </Head>

      <MainLayout>
        <PageHeader icon={IconBuildingCommunity} title="Providers">
          <Link href="/providers/create" passHref>
            <Button component="a" id="createBtn">
              Create
            </Button>
          </Link>
        </PageHeader>

        <Stack spacing="xl">
          {/* TODO: Add filters */}
          <ProvidersList />
        </Stack>
      </MainLayout>
    </>
  );
}
