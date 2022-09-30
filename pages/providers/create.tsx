import {
  Button,
  Group,
  Select,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Category, CategoryType } from "@prisma/client";
import { IconCheck, IconExclamationMark } from "@tabler/icons";
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
  categories: Category[];
}

export default function ProviderCreate({ categories }: Props) {
  const router = useRouter();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      name: "",
      categoryId: "" as CategoryType,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    const result = await fetch(`/api/providers/create`, {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!result.ok) {
      showNotification({
        color: "red",
        title: "Error",
        message: "An error occurred while creating the provider.",
        icon: <IconExclamationMark size={16} />,
      });
      return;
    }

    showNotification({
      color: "teal",
      title: "Provider created",
      message: "The provider was created successfully.",
      icon: <IconCheck size={16} />,
    });

    router.push("/providers");
  };

  return (
    <MainLayout>
      <PageHeader backHref="/providers" title="Create provider" />

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
            <Button type="submit">Create</Button>
          </Group>
        </Stack>
      </form>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const categories = await prisma.category.findMany({
    where: { type: CategoryType.Expense },
    orderBy: { name: "asc" },
  });

  return { props: { categories } };
}
