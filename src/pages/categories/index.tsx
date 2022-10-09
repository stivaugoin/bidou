import { Button, Group, Stack, Table, useMantineTheme } from "@mantine/core";
import { IconCategory, IconChevronRight } from "@tabler/icons";
import Head from "next/head";
import Link from "next/link";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import { prisma } from "../../lib/prisma";
import { getTitle } from "../../utils/getTitle";

export default function Categories({
  categories,
}: {
  categories: ApiGetAllCategories;
}) {
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
                <th>Parent</th>
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

function Row({ category }: { category: ApiGetAllCategories[number] }) {
  return (
    <Link href={`/categories/${category.id}`}>
      <tr style={{ cursor: "pointer" }}>
        <td style={{ width: "33%" }}>{category.name}</td>
        <td style={{ width: "33%" }}>{category.Parent?.name}</td>
        <td style={{ width: "33%" }}>
          <Group position="apart">
            {category.type} <IconChevronRight size={16} />
          </Group>
        </td>
      </tr>
    </Link>
  );
}

export async function getServerSideProps() {
  const categories = await getAllCategories();

  return { props: { categories } };
}

// TODO: Use swr to fetch data and remove getServerSideProps
export type ApiGetAllCategories = Awaited<ReturnType<typeof getAllCategories>>;

async function getAllCategories() {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      Parent: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });
}
