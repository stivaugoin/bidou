import {
  Button,
  Flex,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Category, CategoryType } from "@prisma/client";
import { useState } from "react";
import { TypeOf, z } from "zod";
import { useCategories } from "../hooks/useCategories";
import notification from "../lib/notification";
import { trpc } from "../lib/trpc";

const schema = z.object({
  name: z.string().min(1, "Required"),
  type: z.nativeEnum(CategoryType, {
    errorMap: () => ({ message: "Required" }),
  }),
  parentId: z.string().optional(),
});

const OPTIONS = [
  { value: "", label: "Select a type" },
  { value: CategoryType.Expense, label: "Expense" },
  { value: CategoryType.Income, label: "Income" },
];

interface Props {
  category?: Pick<Category, "id" | "name" | "parentId" | "type">;
  onCancel: () => void;
  onSubmit: (data: TypeOf<typeof schema>) => Promise<void>;
}

export function CategoryForm({ category, onCancel, onSubmit }: Props) {
  const [saving, setSaving] = useState(false);
  const categories = useCategories();
  const trpcCtx = trpc.useContext();

  const form = useForm({
    initialValues: {
      name: category?.name || "",
      type: category?.type || ("" as CategoryType),
      parentId: category?.parentId || "",
    },
    validate: zodResolver(schema),
  });

  const parentSelectData = [
    { value: "", label: "No parent" },
    ...(categories
      ?.filter(filterCurrentCategory(category?.id))
      ?.filter(filterCategoriesWithoutParent(form.values.type))
      ?.map(mapCategory) || []),
  ];

  const handleClose = () => {
    form.reset();
    onCancel();
  };

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    try {
      setSaving(true);
      await onSubmit(data);
      await trpcCtx.categories.getAll.invalidate();
      notification("success");
      form.reset();
    } catch (error) {
      notification("error");
    } finally {
      setSaving(false);
    }
  };

  const { onChange, ...getInputPropsType } = form.getInputProps("type");

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack gap={category ? "lg" : "xl"}>
        <SimpleGrid cols={{ sm: 3 }} spacing="xl">
          <TextInput
            label="Name"
            size={category ? "sm" : "md"}
            {...form.getInputProps("name")}
          />

          <Select
            data={OPTIONS}
            label="Type"
            onChange={(value) => {
              form.setFieldValue("type", (value || "") as CategoryType);
              form.setFieldValue("parentId", "");
            }}
            size={category ? "sm" : "md"}
            {...getInputPropsType}
          />

          <Select
            data={parentSelectData}
            disabled={!form.values.type}
            label="Parent"
            size={category ? "sm" : "md"}
            {...form.getInputProps("parentId")}
          />
        </SimpleGrid>

        <Flex gap="xl">
          <Button loading={saving} size={category ? "sm" : "md"} type="submit">
            {category ? "Update" : "Create"}
          </Button>

          <Button
            disabled={saving}
            onClick={handleClose}
            size={category ? "sm" : "md"}
            type="button"
            variant="subtle"
          >
            {category ? "Cancel" : "Close"}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}

function filterCurrentCategory(categoryId?: string) {
  return (category: NonNullable<Props["category"]>) => {
    if (!categoryId) return true;
    return category.id !== categoryId;
  };
}

function filterCategoriesWithoutParent(type: CategoryType) {
  return (category: NonNullable<Props["category"]>) =>
    category.type === type && category.parentId === null;
}

function mapCategory(category: NonNullable<Props["category"]>) {
  return { value: category.id, label: category.name };
}
