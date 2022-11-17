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
import { useSWRConfig } from "swr";
import { TypeOf, z } from "zod";
import useCategories from "../hooks/useCategories";
import notification from "../lib/notification";
import { ApiGetCategory } from "../server/categories";
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

interface Props {
  category: ApiGetCategory;
}

export default function FormUpdateCategory({ category }: Props) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [saving, setSaving] = useState(false);
  const theme = useMantineTheme();
  const [categories, loading, error] = useCategories();

  const form = useForm({
    initialValues: {
      name: category.name,
      type: category.type as CategoryType,
      parentId: category.Parent?.id || "",
    },
    validate: zodResolver(schema),
  });

  const categoriesParentOptions = categories
    ?.filter(filterCategoriesWithoutParent(form.values.type))
    ?.map(mapCategory);

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    setSaving(true);

    try {
      await mutate(
        `/api/categories/${category.id}`,
        updateCategory(category.id, data),
        {
          populateCache: (data) => ({
            ...data,
            name: data.name,
            Parent: {
              id: data.parentId,
            },
            type: data.type,
          }),
          revalidate: false,
        }
      );
      notification("success");
      router.back();
    } catch (error) {
      console.error(error);
      notification("error");
    } finally {
      setSaving(false);
    }
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
            Save
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

async function updateCategory(categoryId: string, data: TypeOf<typeof schema>) {
  const { parentId, ...category } = data;
  const response = await fetch(`/api/categories/${categoryId}`, {
    body: JSON.stringify({ ...category, parentId: parentId || undefined }),
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
