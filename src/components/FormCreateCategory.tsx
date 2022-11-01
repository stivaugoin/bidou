import {
  Button,
  Group,
  Loader,
  Select,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { TypeOf, z } from "zod";
import useCategories from "../hooks/useCategories";
import notification from "../lib/notification";
import AlertFetchError from "./AlertFetchError";

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

export default function FormCreateCategory() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const theme = useMantineTheme();
  const [categories, loading, error] = useCategories();

  const form = useForm({
    initialValues: {
      name: "",
      type: "" as CategoryType,
      parentId: "",
    },
    validate: zodResolver(schema),
  });

  const categoriesParentOptions = categories
    ?.filter(filterCategoriesWithoutParent(form.values.type))
    ?.map(mapCategory);

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    setSaving(true);
    const response = await fetch("/api/categories/create", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    notification(response.ok ? "success" : "error");
    setSaving(false);
    if (response.ok) router.push("/categories");
  };

  if (error) return <AlertFetchError />;
  if (loading) return <Loader />;

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack spacing="xl" sx={{ maxWidth: theme.breakpoints.xs }}>
        <TextInput label="Name" {...form.getInputProps("name")} />

        <Select data={OPTIONS} label="Type" {...form.getInputProps("type")} />

        {form.values.type && form.values.type === CategoryType.Expense && (
          <Select
            data={[
              { value: "", label: "No parent" },
              ...(categoriesParentOptions || []),
            ]}
            label="Parent"
            {...form.getInputProps("parentId")}
          />
        )}

        <Group>
          <Button loading={saving} type="submit">
            Create
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

type Category = NonNullable<ReturnType<typeof useCategories>[0]>[number];

function filterCategoriesWithoutParent(type: CategoryType) {
  return (category: Category) =>
    category.type === type && category.Parent === null;
}

function mapCategory(category: Category) {
  return { value: category.id, label: category.name };
}
