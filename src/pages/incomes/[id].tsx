import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { CategoryType } from "@prisma/client";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { TypeOf, z } from "zod";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import notification from "../../lib/notification";
import { prisma } from "../../lib/prisma";
import { formatTransactionToSave } from "../../utils/formatTransactionToSave";

const schema = z.object({
  amount: z.number(),
  categoryId: z.string().min(1, "Required"),
  date: z.date({ required_error: "Required" }),
  note: z.string().nullable(),
});

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
  income: Awaited<ReturnType<typeof getIncome>>;
}

export default function IncomeView({ income, categories }: Props) {
  const router = useRouter();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      amount: income.amount / 100,
      categoryId: income.Category.id as CategoryType,
      date: dayjs(income.date).toDate(),
      note: income.note,
    },
    validate: zodResolver(schema),
  });

  const handleDelete = async () => {
    const result = await fetch(`/api/incomes/${income.id}`, {
      method: "DELETE",
    });

    notification(result.ok ? "success" : "error");
    if (result.ok) router.push("/incomes");
  };

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    const result = await fetch(`/api/incomes/${income.id}`, {
      body: JSON.stringify(formatTransactionToSave(data)),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });

    notification(result.ok ? "success" : "error");
    if (result.ok) router.push("/incomes");
  };

  const openModal = () =>
    openConfirmModal({
      title: `Are you sure you want to delete this income?`,
      children: <Text size="sm">This action cannot be reverted.</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: {
        color: "red",
      },
      onConfirm: handleDelete,
    });

  return (
    <MainLayout>
      <PageHeader backHref="/incomes" title="Edit income">
        <ActionIcon color="red" onClick={openModal} size="lg" variant="subtle">
          <FontAwesomeIcon icon={faTrash} />
        </ActionIcon>
      </PageHeader>

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
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  {
    categories: Awaited<ReturnType<typeof getCategories>>;
    income: Awaited<ReturnType<typeof getIncome>>;
  },
  { id: string }
> = async ({ params }) => {
  try {
    const income = await getIncome(params?.id);
    const categories = await getCategories();

    return { props: { categories, income } };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function getCategories() {
  return prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
    where: { type: CategoryType.Income },
  });
}

async function getIncome(id?: string) {
  const income = await prisma.income.findFirstOrThrow({
    select: {
      id: true,
      amount: true,
      date: true,
      note: true,
      Category: { select: { id: true } },
    },
    where: { id },
  });

  return {
    ...income,
    date: dayjs(income.date).format(),
  };
}
