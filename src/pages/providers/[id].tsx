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
import { prisma } from "../../lib/prisma";

const schema = z.object({
  categoryId: z.string().min(1, "Required"),
  name: z.string().min(1),
});

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
  provider: Awaited<ReturnType<typeof getProvider>>;
}

export default function ProviderView({ categories, provider }: Props) {
  const router = useRouter();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      categoryId: provider.Category.id as CategoryType,
      name: provider.name,
    },
    validate: zodResolver(schema),
  });

  const handleDelete = async () => {
    const result = await fetch(`/api/providers/${provider.id}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      showNotification({
        color: "red",
        title: "Error",
        message: "There was an error deleting the provider.",
        icon: <IconExclamationMark size={16} />,
      });
      return;
    }

    showNotification({
      color: "teal",
      title: `${provider.name} deleted`,
      message: "The provider was deleted successfully.",
      icon: <IconCheck size={16} />,
    });

    router.push("/providers");
  };

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    const result = await fetch(`/api/providers/${provider.id}`, {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });

    if (!result.ok) {
      showNotification({
        color: "red",
        title: "Error",
        message: "An error occurred while updating the provider.",
        icon: <IconExclamationMark size={16} />,
      });
      return;
    }

    showNotification({
      color: "teal",
      title: "Provider updated",
      message: "The provider was updated successfully.",
      icon: <IconCheck size={16} />,
    });

    router.push("/providers");
  };

  const openModal = () =>
    openConfirmModal({
      title: `Are you sure you want to delete ${provider.name}?`,
      children: <Text size="sm">This action cannot be reverted.</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: {
        color: "red",
      },
      onConfirm: handleDelete,
    });

  return (
    <MainLayout>
      <PageHeader backHref="/providers" title="Edit provider">
        <ActionIcon color="red" onClick={openModal} size="lg" variant="subtle">
          <IconTrash />
        </ActionIcon>
      </PageHeader>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack spacing="xl" sx={{ maxWidth: theme.breakpoints.xs }}>
          <TextInput label="Name" {...form.getInputProps("name")} />

          <Select
            data={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            label="Category"
            {...form.getInputProps("categoryId")}
          />

          <Group>
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  {
    categories: Awaited<ReturnType<typeof getCategories>>;
    provider: Awaited<ReturnType<typeof getProvider>>;
  },
  { id: string }
> = async ({ params }) => {
  try {
    const provider = await getProvider(params?.id);
    const categories = await getCategories();

    return { props: { categories, provider } };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function getCategories() {
  return prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
    where: { type: CategoryType.Expense },
  });
}

async function getProvider(id?: string) {
  return prisma.provider.findFirstOrThrow({
    select: { id: true, name: true, Category: { select: { id: true } } },
    where: { id },
  });
}
