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
import { CategoryType } from "@prisma/client";
import { IconCheck, IconExclamationMark } from "@tabler/icons";
import { useRouter } from "next/router";
import { TypeOf, z } from "zod";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import useCategories from "../../hooks/useCategories";

const schema = z.object({
  name: z.string().min(1),
  type: z.nativeEnum(CategoryType),
  parentId: z.string().optional(),
});

const OPTIONS = [
  { value: "", label: "Select a type" },
  { value: CategoryType.Expense, label: "Expense" },
  { value: CategoryType.Income, label: "Income" },
];

export default function CategoryCreate() {
  const router = useRouter();
  const theme = useMantineTheme();
  const [categories] = useCategories();

  const form = useForm({
    initialValues: {
      name: "",
      type: "" as CategoryType,
      parentId: "",
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

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    const result = await fetch(`/api/categories/create`, {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!result.ok) {
      showNotification({
        color: "red",
        title: "Error",
        message: "An error occurred while creating the category.",
        icon: <IconExclamationMark size={16} />,
      });
      return;
    }

    showNotification({
      color: "teal",
      title: "Category created",
      message: "The category was created successfully.",
      icon: <IconCheck size={16} />,
    });

    router.push("/categories");
  };

  return (
    <MainLayout>
      <PageHeader backHref="/categories" title="Create category" />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack spacing="xl" sx={{ maxWidth: theme.breakpoints.xs }}>
          <TextInput label="Name" {...form.getInputProps("name")} />

          <Select data={OPTIONS} label="Type" {...form.getInputProps("type")} />

          {form.values.type && (
            <Select
              data={categoriesParentOptions}
              label="Parent"
              {...form.getInputProps("parentId")}
            />
          )}

          <Group>
            <Button type="submit">Create</Button>
          </Group>
        </Stack>
      </form>
    </MainLayout>
  );
}
