import {
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/router";
import { TypeOf, z } from "zod";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import { prisma } from "../../lib/prisma";
import { formatTransactionToSave } from "../../utils/formatTransactionToSave";

const schema = z.object({
  amount: z.number(),
  date: z.date({ required_error: "Required" }),
  note: z.string(),
  categoryId: z.string().min(1, "Required"),
});

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

export default function IncomeCreate({ categories }: Props) {
  const router = useRouter();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      amount: undefined as unknown as number,
      date: new Date(),
      note: "",
      categoryId: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (data: TypeOf<typeof schema>) => {
    const result = await fetch(`/api/expenses/create`, {
      body: JSON.stringify(formatTransactionToSave(data)),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!result.ok) {
      showNotification({
        color: "red",
        title: "Error",
        message: "An error occurred while creating the expense.",
        icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
      });
      return;
    }

    showNotification({
      color: "teal",
      title: "Expense created",
      message: "The expense was created successfully.",
      icon: <FontAwesomeIcon icon={faCheckCircle} />,
    });

    router.push("/expenses");
  };

  return (
    <MainLayout>
      <PageHeader backHref="/expenses" title="Create expense" />

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
            data={categories
              .filter((category) => category.Children.length === 0)
              .map((category) => ({
                value: category.id,
                label: category.name,
                group: category.Parent?.name || "No parent",
              }))}
            label="Category"
            {...form.getInputProps("categoryId")}
          />

          <Textarea label="Note" {...form.getInputProps("note")} />

          <Group>
            <Button type="submit">Create</Button>
          </Group>
        </Stack>
      </form>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const categories = await getCategories();
  return { props: { categories } };
}

async function getCategories() {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
      Parent: { select: { name: true } },
      Children: { select: { name: true } },
    },
    where: { type: CategoryType.Expense },
    orderBy: { name: "asc" },
  });
}
