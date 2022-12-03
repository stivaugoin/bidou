import { Stack } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import MainLayout from "../components/MainLayout";
import { trpc } from "../lib/trpc";

export default function Transactions() {
  const { data, error, isLoading } = trpc.transactions.getByType.useQuery({
    type: CategoryType.Income,
  });

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <MainLayout>
      <Stack>
        <h1>Transactions</h1>

        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </Stack>
    </MainLayout>
  );
}
