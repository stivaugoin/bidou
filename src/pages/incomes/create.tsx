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
import { Category, CategoryType } from "@prisma/client";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { TypeOf, z } from "zod";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import notification from "../../lib/notification";
import { prisma } from "../../lib/prisma";

const schema = z.object({
  amount: z.number(),
  categoryId: z.string().min(1, "Required"),
  date: z.date({ required_error: "Required" }),
  note: z.string(),
});

interface Props {
  categories: Category[];
}

export default function IncomeCreate({ categories }: Props) {
  const router = useRouter();
  const theme = useMantineTheme();

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
    const result = await fetch(`/api/incomes/create`, {
      body: JSON.stringify(formatToSave(data)),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    notification(result.ok ? "success" : "error");
    if (result.ok) router.push("/incomes");
  };

  return (
    <MainLayout>
      <PageHeader backHref="/incomes" title="Create income" />

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
            <Button type="submit">Create</Button>
          </Group>
        </Stack>
      </form>
    </MainLayout>
  );
}

function formatToSave(data: TypeOf<typeof schema>): Override<
  TypeOf<typeof schema>,
  {
    date: string;
  }
> {
  return {
    ...data,
    amount: data.amount * 100,
    date: dayjs(data.date).format(),
  };
}

export async function getServerSideProps() {
  const categories = await prisma.category.findMany({
    where: { type: CategoryType.Income },
    orderBy: { name: "asc" },
  });

  return { props: { categories } };
}
