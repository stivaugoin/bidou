import { faFolderTree } from "@fortawesome/free-solid-svg-icons";
import { Button, Collapse, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CategoryFormCreate } from "../../components/CategoryFormCreate";
import { CategoryList } from "../../components/CategoryList";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";

export default function Categories() {
  const [open, { toggle }] = useDisclosure(false);

  return (
    <MainLayout>
      <PageHeader icon={faFolderTree} title="Categories">
        <Button disabled={open} id="createBtn" onClick={toggle}>
          Create
        </Button>
      </PageHeader>

      <Collapse in={open}>
        <CategoryFormCreate onClose={toggle} />
      </Collapse>

      <Stack spacing="xl">
        {/* TODO: Add filters */}
        <CategoryList />
      </Stack>
    </MainLayout>
  );
}
