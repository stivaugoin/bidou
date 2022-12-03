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
import { inferRouterOutputs } from "@trpc/server";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { TypeOf, z } from "zod";
import useCategories from "../hooks/useCategories";
import notification from "../lib/notification";
import { trpc } from "../lib/trpc";
import { TransactionRouter } from "../server/trpc/transactions";
import AlertFetchError from "./AlertFetchError";

const schema = z.object({
  amount: z.number(),
  categoryId: z.string().min(1, "Required"),
  date: z.date({ required_error: "Required" }),
  note: z.string().nullable(),
});

interface Props {
  // TODO: Improve this type. Do not use TransactionRouter.
  transaction: NonNullable<inferRouterOutputs<TransactionRouter>["getById"]>;
}

export default function FormUpdateTransaction({ transaction }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const theme = useMantineTheme();
  const mutation = trpc.transactions.update.useMutation();

  const [categories, categoriesLoading, categoriesError] = useCategories(
    transaction.type
  );

  const form = useForm({
    initialValues: {
      amount: transaction.amount / 100,
      categoryId: transaction.categoryId,
      date: dayjs(transaction.date).toDate(),
      note: transaction.note || "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    try {
      setSaving(true);
      await mutation.mutateAsync({ id: transaction.id, ...data });
      notification("success");
      router.back();
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
          data={categories.map((category) => ({
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
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
