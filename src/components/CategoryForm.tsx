import {
  Button,
  Flex,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CategoryType } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import { TypeOf, z } from "zod";
import { useCategories } from "../hooks/useCategories";
import notification from "../lib/notification";
import { trpc } from "../lib/trpc";
import { CategoriesRouter } from "../server/trpc/categories";

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
  category?: Optional<
    inferRouterOutputs<CategoriesRouter>["getAll"][number],
    "Children"
  >;
  onCancel: () => void;
  onSubmit: (data: TypeOf<typeof schema>) => Promise<void>;
}

export type OnSubmitParams = Parameters<Props["onSubmit"]>[0];

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

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack spacing="xl">
        <SimpleGrid breakpoints={[{ minWidth: "sm", cols: 3 }]} spacing="xl">
          <TextInput label="Name" {...form.getInputProps("name")} />

          <Select
            data={OPTIONS}
            label="Type"
            onChange={(value: CategoryType) => {
              form.setFieldValue("type", value || "");
              form.setFieldValue("parentId", "");
            }}
            onBlur={form.getInputProps("type")["onBlur"]}
            onFocus={form.getInputProps("type")["onFocus"]}
            value={form.getInputProps("type")["value"]}
          />

          <Select
            data={parentSelectData}
            disabled={!form.values.type}
            label="Parent"
            {...form.getInputProps("parentId")}
          />
        </SimpleGrid>

        <Flex gap="xl">
          <Button loading={saving} type="submit">
            {category ? "Update" : "Create"}
          </Button>

          <Button
            disabled={saving}
            onClick={handleClose}
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

function filterCategoriesWithoutParent(type: CategoryType) {
  return (category: NonNullable<Props["category"]>) =>
    category.type === type && category.parentId === null;
}

function mapCategory(category: NonNullable<Props["category"]>) {
  return { value: category.id, label: category.name };
}
