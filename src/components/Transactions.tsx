import { Box, Loader, Pagination, Stack, Text } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../lib/trpc";
import AlertFetchError from "./AlertFetchError";
import { List } from "./List";
import { TransactionItem } from "./TransactionItem";
import { TransactionMenu } from "./TransactionMenu";

export default function Transactions() {
  const [page, setPage] = useState(1);
  const [transactionEditIds, setTransactionEditIds] = useState<string[]>([]);

  const router = useRouter();

  const { data, error, isLoading } = trpc.transactions.getByFilters.useQuery({
    categoryId: router.query.categoryId as string,
    page,
    type: router.query.type as CategoryType,
  });

  if (error) return <AlertFetchError message={error.message} />;
  if (isLoading) return <Loader />;

  return (
    <>
      {(!data || data.transactions.length === 0) && (
        <Stack
          role="list"
          spacing={0}
          sx={(theme) => ({
            borderRadius: theme.radius.md,
            border: theme.other.border,
          })}
        >
          <Box p="md" sx={{ textAlign: "center" }}>
            <Text color="dimmed" italic>
              No data
            </Text>
          </Box>
        </Stack>
      )}

      <List
        data={data.transactions}
        renderItem={(transaction) => (
          <TransactionItem
            data={transaction}
            edit={transactionEditIds.includes(transaction.id)}
            onCloseEdit={() =>
              setTransactionEditIds((ids) =>
                ids.filter((id) => id !== transaction.id)
              )
            }
          />
        )}
        renderMenu={(transaction) => {
          if (transactionEditIds.includes(transaction.id)) return null;
          return (
            <TransactionMenu
              onClickEdit={(transactionId) =>
                setTransactionEditIds((ids) => [...ids, transactionId])
              }
              transaction={transaction}
            />
          );
        }}
      />

      <Pagination onChange={setPage} page={page} total={data.totalPage} />
    </>
  );
}
