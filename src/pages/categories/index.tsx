import {
  faChevronRight,
  faFolderTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Stack, Table } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import CreateButton from "../../components/CreateButton";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import useCategories from "../../hooks/useCategories";
import { getTitle } from "../../utils/getTitle";
import { ApiGetAllCategories } from "../api/categories";

export default function Categories() {
  const [categories] = useCategories();

  return (
    <>
      <Head>
        <title>{getTitle("Categories")}</title>
      </Head>

      <MainLayout>
        <PageHeader icon={faFolderTree} title="Categories">
          <CreateButton />
        </PageHeader>

        <Stack spacing="xl">
          {/* TODO: Add filters */}
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Parent</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
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
            {category.type} <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </Group>
        </td>
      </tr>
    </Link>
  );
}
