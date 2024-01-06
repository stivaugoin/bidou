import { Box, Button, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Categories } from "../components/Categories";
import { CategoryForm } from "../components/CategoryForm";
import MainLayout from "../components/MainLayout";
import PageHeader from "../components/PageHeader";
import { trpc } from "../lib/trpc";

export default function CategoriesPage() {
  const [open, { toggle }] = useDisclosure(false);
  const mutation = trpc.categories.create.useMutation();

  return (
    <MainLayout>
      <PageHeader title="Categories">
        <Button disabled={open} id="createBtn" onClick={toggle}>
          Create
        </Button>
      </PageHeader>

      <Collapse in={open}>
        <Box mb="xl">
          <CategoryForm
            onCancel={toggle}
            onSubmit={async (data) => {
              await mutation.mutateAsync(data);
            }}
          />
        </Box>
      </Collapse>

      <Categories />
    </MainLayout>
  );
}
