import {
  Button,
  Group,
  Loader,
  NumberInput,
  Select,
  Stack,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { TypeOf, z } from "zod";
import useCategories from "../hooks/useCategories";
import notification from "../lib/notification";
import { trpc } from "../lib/trpc";
import AlertFetchError from "./AlertFetchError";

const schema = z.object({
  amount: z.number(),
  categoryId: z.string().min(1, "Required"),
  date: z.date({ required_error: "Required" }),
  note: z.string().nullable(),
});

type Props = {
  type: CategoryType;
};

export default function FormCreateTransaction({ type }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const theme = useMantineTheme();

  const mutation = trpc.transactions.create.useMutation();

  const [categories, categoriesLoading, categoriesError] = useCategories(type);

  const form = useForm({
    initialValues: {
      amount: undefined as unknown as number,
      categoryId: "",
      date: new Date(),
      note: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    setSaving(true);

    try {
      await mutation.mutateAsync(data);
      router.back();
    } catch (error) {
      notification("error");
    } finally {
      setSaving(false);
    }
  };

  if (categoriesError) return <AlertFetchError />;
  if (categoriesLoading) return <Loader />;

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack spacing="xl" sx={{ maxWidth: theme.breakpoints.xs }}>
        <NumberInput
          formatter={(value) => value?.replace(",", ".")}
          hideControls
          label="Amount"
          precision={2}
          step="0.01"
          {...form.getInputProps("amount")}
        />

        <DatePicker
          clearable={false}
          firstDayOfWeek="sunday"
          label="Date"
          {...form.getInputProps("date")}
        />

        <Select
          data={categories
            .filter((category) => category.Children.length === 0)
            .map((category) => ({
              group: category.Parent?.name,
              label: category.name,
              value: category.id,
            }))}
          label="Category"
          {...form.getInputProps("categoryId")}
        />

        <Textarea label="Note" {...form.getInputProps("note")} />

        <Group>
          <Button loading={saving} type="submit">
            Create
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
