import {
  Button,
  Flex,
  Group,
  NumberInput,
  Select,
  Stack,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
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

  const categoryData = categories
    .filter((category) => category.Children.length === 0)
    .reduce<
      { group: string; items: Array<{ label: string; value: string }> }[]
    >((acc, category) => {
      const parentName = category.Parent?.name ?? "";
      const group = acc.find((item) => item.group === parentName);

      if (!group) {
        return [
          ...acc,
          {
            group: parentName,
            items: [{ label: category.name, value: category.id }],
          },
        ];
      }

      const otherGroups = acc.filter((item) => item.group !== parentName);
      return [
        ...otherGroups,
        {
          ...group,
          items: [...group.items, { label: category.name, value: category.id }],
        },
      ];
    }, []);

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack gap="xl">
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap="xl"
          style={{ "& > div": { flexGrow: 1 } }}
        >
          <DatePickerInput
            clearable={false}
            firstDayOfWeek={0}
            label="Date"
            size="sm"
            {...form.getInputProps("date")}
          />

          <Select
            data={categoryData}
            label="Category"
            size="sm"
            {...form.getInputProps("categoryId")}
          />

          <NumberInput
            hideControls
            label="Amount"
            decimalScale={2}
            fixedDecimalScale
            size="sm"
            step={0.01}
            {...form.getInputProps("amount")}
          />
        </Flex>

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
