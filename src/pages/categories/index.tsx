import {
  faChevronRight,
  faFolderTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, Group, Stack, Table } from "@mantine/core";
import Link from "next/link";
import CreateButton from "../../components/CreateButton";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import useCategories from "../../hooks/useCategories";
import { ApiGetAllCategories } from "../api/categories";

export default function Categories() {
  const [categories] = useCategories();

  return (
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
  );
}

function Row({ category }: { category: ApiGetAllCategories[number] }) {
  const { classes } = styles();

  return (
    <Link href={`/categories/${category.id}`}>
      <tr className={classes.row}>
        <td className={classes.cell}>{category.name}</td>
        <td className={classes.cell}>{category.Parent?.name}</td>
        <td className={classes.cell}>
          <Group position="apart">
            {category.type} <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </Group>
        </td>
      </tr>
    </Link>
  );
}

const styles = createStyles(() => ({
  cell: { width: "33%" },
  row: { cursor: "pointer" },
}));
