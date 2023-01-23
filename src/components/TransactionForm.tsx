import {
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  Textarea,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { Transaction } from "@prisma/client";
import { useState } from "react";
import { TypeOf, z } from "zod";
import { useCategories } from "../hooks/useCategories";
import notification from "../lib/notification";
import { trpc } from "../lib/trpc";

const schema = z.object({
  amount: z.number(),
  categoryId: z.string().min(1, "Required"),
  date: z.date({ required_error: "Required" }),
  note: z.string().nullable(),
});

type Props = {
  onClose: () => void;
  transaction?: Pick<
    Transaction,
    "id" | "amount" | "categoryId" | "date" | "note"
  >;
};

const emptyValues = {
  amount: undefined as unknown as number,
  categoryId: "",
  date: new Date(),
  note: "",
};

function formatTransaction(transaction: NonNullable<Props["transaction"]>) {
  return {
    ...transaction,
    amount: transaction.amount / 100,
  };
}

export default function TransactionForm({ onClose, transaction }: Props) {
  const [saving, setSaving] = useState(false);
  const categories = useCategories();
  const createTransaction = trpc.transactions.create.useMutation();
  const updateTransaction = trpc.transactions.update.useMutation();
  const context = trpc.useContext();

  const initialValues = transaction
    ? formatTransaction(transaction)
    : emptyValues;

  const form = useForm({
    initialValues,
    validate: zodResolver(schema),
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    setSaving(true);

    try {
      if (transaction) {
        await updateTransaction.mutateAsync({ id: transaction.id, ...data });
        onClose();
      } else {
        await createTransaction.mutateAsync(data);
        form.reset();
      }

      await context.transactions.getByFilters.refetch();
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
        <Group grow spacing="xl">
          <DatePicker
            clearable={false}
            firstDayOfWeek="sunday"
            label="Date"
            size="sm"
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
            size="sm"
            {...form.getInputProps("categoryId")}
          />

          <NumberInput
            formatter={(value) => value?.replace(",", ".")}
            hideControls
            label="Amount"
            precision={2}
            size="sm"
            step="0.01"
            {...form.getInputProps("amount")}
          />
        </Group>

        <Textarea label="Note" {...form.getInputProps("note")} />

        <Group>
          <Button loading={saving} size="sm" type="submit">
            {transaction ? "Update" : "Create"}
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
