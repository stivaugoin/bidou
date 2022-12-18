import {
  Button,
  Group,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CategoryType } from "@prisma/client";
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
  onClose: () => void;
}

export function CategoryFormCreate({ onClose }: Props) {
  const [saving, setSaving] = useState(false);
  const categories = useCategories();
  const mutation = trpc.categories.create.useMutation();
  const trpcCtx = trpc.useContext();

  const form = useForm({
    initialValues: {
      name: "",
      type: "" as CategoryType,
      parentId: "",
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
    onClose();
  };

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    try {
      setSaving(true);

      await mutation.mutateAsync(data);
      await trpcCtx.categories.getAll.invalidate();

      form.reset();
      notification("success");
    } catch (error) {
      notification("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack spacing="xl">
        <SimpleGrid cols={3} spacing="xl">
          <TextInput label="Name" {...form.getInputProps("name")} />

          <Select data={OPTIONS} label="Type" {...form.getInputProps("type")} />

          {form.values.type && (
            <Select
              data={parentSelectData}
              label="Parent"
              {...form.getInputProps("parentId")}
            />
          )}
        </SimpleGrid>

        <Group>
          <Button loading={saving} size="sm" type="submit">
            Create
          </Button>
          <Button
            disabled={saving}
            onClick={handleClose}
            size="sm"
            type="button"
            variant="subtle"
          >
            Close
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

type Category = NonNullable<ReturnType<typeof useCategories>>[number];

function filterCategoriesWithoutParent(type: CategoryType) {
  return (category: Category) =>
    category.type === type && category.parentId === null;
}

function mapCategory(category: Category) {
  return { value: category.id, label: category.name };
}
