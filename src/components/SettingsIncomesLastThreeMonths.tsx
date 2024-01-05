import { Button, Flex, Group, Stack, Switch } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CategoryType } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { TypeOf, z } from "zod";
import notification from "../lib/notification";
import { trpc } from "../lib/trpc";
import { AppRouter } from "../server/trpc/routers";
import { SelectCategory } from "./SelectCategory";

const schema = z.object({
  active: z.boolean(),
  categoryIdOne: z.string().nullable(),
  categoryIdTwo: z.string().nullable(),
  displayDifference: z.boolean().nullable(),
});

interface Props {
  settings: NonNullable<
    inferRouterOutputs<AppRouter>["dashboard"]["incomesLastThreeMonths"]["getSettings"]
  >;
}

export function SettingsIncomesLastThreeMonths({ settings }: Props) {
  const mutation =
    trpc.dashboard.incomesLastThreeMonths.setSettings.useMutation();
  const trpcCtx = trpc.useContext();

  const form = useForm({
    initialValues: {
      active: settings.active,
      categoryIdOne: settings.categoryIdOne,
      categoryIdTwo: settings.categoryIdTwo,
      displayDifference: settings.displayDifference || false,
    },
    validate: zodResolver(schema),
  });

  async function handleSubmit(data: TypeOf<typeof schema>) {
    try {
      await mutation.mutateAsync(data);
      await trpcCtx.dashboard.incomesLastThreeMonths.getSettings.invalidate();
      notification("success");
      form.resetDirty();
    } catch (error) {
      notification("error");
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack justify="center">
        <Switch
          description="Choose up to two categories to display on the dashboard"
          label="Incomes - Last three months"
          {...form.getInputProps("active", { type: "checkbox" })}
        />

        {form.values.active && (
          <Stack>
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap="md"
              style={{ "& > *": { flexGrow: 1 } }}
            >
              <SelectCategory
                label="Category One"
                size="sm"
                type={CategoryType.Income}
                {...form.getInputProps("categoryIdOne")}
              />
              <SelectCategory
                label="Category Two"
                size="sm"
                type={CategoryType.Income}
                {...form.getInputProps("categoryIdTwo")}
              />
            </Flex>

            <Switch
              disabled={
                !form.values.categoryIdOne || !form.values.categoryIdTwo
              }
              label="Display difference of total amount"
              {...form.getInputProps("displayDifference", { type: "checkbox" })}
            />
          </Stack>
        )}
        <Group>
          <Button
            disabled={!form.isDirty()}
            size="sm"
            type="submit"
            variant="default"
          >
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
