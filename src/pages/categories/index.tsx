import { Button, Group, Stack, Table, useMantineTheme } from "@mantine/core";
import { Category } from "@prisma/client";
import { IconCategory, IconChevronRight } from "@tabler/icons";
import Head from "next/head";
import Link from "next/link";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import { prisma } from "../../lib/prisma";
import { getTitle } from "../../utils/getTitle";

export default function Categories({ categories }: { categories: Category[] }) {
  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <title>{getTitle("Categories")}</title>
      </Head>

      <MainLayout>
        <PageHeader icon={IconCategory} title="Categories">
          <Link href="/categories/create" passHref>
            <Button component="a" id="createBtn">
              Create
            </Button>
          </Link>
        </PageHeader>

        <Stack spacing="xl">
          {/* TODO: Add filters */}
          <Table fontSize="md" highlightOnHover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <Row category={category} key={category.id} />
              ))}
            </tbody>
          </Table>
        </Stack>
      </MainLayout>
    </>
  );
}

function Row({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.id}`}>
      <tr style={{ cursor: "pointer" }}>
        <td style={{ width: "50%" }}>{category.name}</td>
        <td style={{ width: "50%" }}>
          <Group position="apart">
            {category.type} <IconChevronRight size={16} />
          </Group>
        </td>
      </tr>
    </Link>
  );
}

export async function getServerSideProps() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return { props: { categories } };
}
