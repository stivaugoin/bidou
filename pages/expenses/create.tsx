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
import { IconCheck, IconExclamationMark } from "@tabler/icons";
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
  providerId: z.string().min(1, "Required"),
});

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

export default function IncomeCreate({ providers }: Props) {
  const router = useRouter();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      amount: undefined as unknown as number,
      date: new Date(),
      note: "",
      providerId: "",
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
        icon: <IconExclamationMark size={16} />,
      });
      return;
    }

    showNotification({
      color: "teal",
      title: "Expense created",
      message: "The expense was created successfully.",
      icon: <IconCheck size={16} />,
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
            data={providers.map((provider) => ({
              value: provider.id,
              label: provider.name,
              group: provider.Category.name,
            }))}
            label="Provider"
            {...form.getInputProps("providerId")}
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
  const providers = await getProviders();
  return { props: { providers } };
}

async function getProviders() {
  return prisma.provider.findMany({
    orderBy: [{ Category: { name: "asc" } }, { name: "asc" }],
    select: { id: true, name: true, Category: { select: { name: true } } },
  });
}
