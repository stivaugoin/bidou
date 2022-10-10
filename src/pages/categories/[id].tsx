import {
  ActionIcon,
  Button,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { CategoryType } from "@prisma/client";
import { IconCheck, IconExclamationMark, IconTrash } from "@tabler/icons";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { TypeOf, z } from "zod";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import useCategories from "../../hooks/useCategories";
import { prisma } from "../../lib/prisma";

const schema = z.object({
  name: z.string().min(1),
  type: z.nativeEnum(CategoryType),
  parentId: z.string().optional().nullable(),
});

const OPTIONS = [
  { value: CategoryType.Expense, label: "Expense" },
  { value: CategoryType.Income, label: "Income" },
];

export default function CategoryView({
  category,
}: {
  category: Awaited<ReturnType<typeof getCategory>>;
}) {
  const router = useRouter();
  const theme = useMantineTheme();
  const [categories] = useCategories();

  const form = useForm({
    initialValues: {
      name: category.name,
      type: category.type as CategoryType,
      parentId: category.Parent?.id || null,
    },
    validate: zodResolver(schema),
  });

  const parentCategories = categories?.filter(
    (category) => category.type === form.values.type && category.Parent === null
  );

  const categoriesParentOptions = (parentCategories || [])?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleDelete = async () => {
    const result = await fetch(`/api/categories/${category.id}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      showNotification({
        color: "red",
        title: "Error",
        message: "There was an error deleting the category.",
        icon: <IconExclamationMark size={16} />,
      });
      return;
    }

    showNotification({
      color: "teal",
      title: `${category.name} deleted`,
      message: "The category was deleted successfully.",
      icon: <IconCheck size={16} />,
    });

    router.push("/categories");
  };

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    const result = await fetch(`/api/categories/${category.id}`, {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });

    if (!result.ok) {
      showNotification({
        color: "red",
        title: "Error",
        message: "An error occurred while updating the category.",
        icon: <IconExclamationMark size={16} />,
      });
      return;
    }

    showNotification({
      color: "teal",
      title: "Category updated",
      message: "The category was updated successfully.",
      icon: <IconCheck size={16} />,
    });

    router.push("/categories");
  };

  const openModal = () =>
    openConfirmModal({
      title: `Are you sure you want to delete ${category.name}?`,
      children: <Text size="sm">This action cannot be reverted.</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: {
        color: "red",
      },
      onConfirm: handleDelete,
    });

  return (
    <MainLayout>
      <PageHeader backHref="/categories" title="Edit category">
        <ActionIcon color="red" onClick={openModal} size="lg" variant="subtle">
          <IconTrash />
        </ActionIcon>
      </PageHeader>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack spacing="xl" sx={{ maxWidth: theme.breakpoints.xs }}>
          <TextInput label="Name" {...form.getInputProps("name")} />

          <Select
            data={OPTIONS}
            disabled
            label="Type"
            {...form.getInputProps("type")}
          />

          {form.values.type && category.Children.length === 0 && (
            <Select
              data={[
                { value: null, label: "No parent" },
                ...categoriesParentOptions,
              ]}
              label="Parent"
              {...form.getInputProps("parentId")}
            />
          )}

          <Group>
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (typeof context.query.id !== "string") throw new Error("Invalid id");

  const category = await getCategory(context.query.id);

  return { props: { category } };
};

async function getCategory(id: string) {
  return await prisma.category.findFirstOrThrow({
    where: { id },
    include: { Parent: true, Children: true },
  });
}
