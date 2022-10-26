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
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { TypeOf, z } from "zod";
import useCategories from "../hooks/useCategories";
import notification from "../lib/notification";
import { ApiGetIncome } from "../server/incomes";
import { formatTransactionToSave } from "../utils/formatTransactionToSave";
import AlertFetchError from "./AlertFetchError";

const schema = z.object({
  amount: z.number(),
  categoryId: z.string().min(1, "Required"),
  date: z.date({ required_error: "Required" }),
  note: z.string().nullable(),
});

interface Props {
  income: ApiGetIncome;
}

export default function FormUpdateIncome({ income }: Props) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [saving, setSaving] = useState(false);
  const theme = useMantineTheme();

  const [categories, categoriesLoading, categoriesError] = useCategories(
    CategoryType.Income
  );

  const form = useForm({
    initialValues: {
      amount: income.amount / 100,
      categoryId: income.Category.id,
      date: dayjs(income.date).toDate(),
      note: income.note || "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    setSaving(true);

    try {
      await mutate(`/api/incomes/${income.id}`, updateIncome(income.id, data), {
        populateCache: (data) => ({
          id: income.id,
          amount: data.amount,
          Category: {
            id: data.categoryId,
          },
          date: data.date,
          note: data.note,
        }),
        revalidate: false,
      });
      notification("success");
      router.push("/incomes");
    } catch (error) {
      console.error(error);
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
          hideControls
          label="Amount"
          precision={2}
          {...form.getInputProps("amount")}
        />

        <DatePicker
          clearable={false}
          firstDayOfWeek="sunday"
          label="Date"
          {...form.getInputProps("date")}
        />

        <Select
          data={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          label="Category"
          {...form.getInputProps("categoryId")}
        />

        <Textarea label="Note" {...form.getInputProps("note")} />

        <Group>
          <Button loading={saving} type="submit">
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

async function updateIncome(incomeId: string, data: TypeOf<typeof schema>) {
  const response = await fetch(`/api/incomes/${incomeId}`, {
    body: JSON.stringify(formatTransactionToSave(data)),
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
