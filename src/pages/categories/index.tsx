import { faFolderTree } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "@mantine/core";
import CategoriesList from "../../components/CategoriesList";
import CreateButton from "../../components/CreateButton";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";

export default function Categories() {
  return (
    <MainLayout>
      <PageHeader icon={faFolderTree} title="Categories">
        <CreateButton />
      </PageHeader>

      <Stack spacing="xl">
        {/* TODO: Add filters */}
        <CategoriesList />
      </Stack>
    </MainLayout>
  );
}
