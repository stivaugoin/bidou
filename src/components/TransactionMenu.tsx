import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { inferRouterOutputs } from "@trpc/server";
import notification from "../lib/notification";
import { trpc } from "../lib/trpc";
import { TransactionRouter } from "../server/trpc/transactions";

interface Props {
  onClickEdit: (transactionId: string) => void;
  transaction: inferRouterOutputs<TransactionRouter>["getByFilters"]["transactions"][number];
}

export function TransactionMenu({ onClickEdit, transaction }: Props) {
  const mutation = trpc.transactions.delete.useMutation();
  const trpcCtx = trpc.useContext();

  function handleDelete() {
    openConfirmModal({
      children: (
        <Text mb={32} size="sm">
          Are you sure you want to delete this transaction? This action cannot
          be undone.
        </Text>
      ),
      confirmProps: { color: "red" },
      labels: { confirm: "Delete transaction", cancel: "Cancel" },
      onConfirm: async () => {
        try {
          await mutation.mutateAsync({ id: transaction.id });
          await trpcCtx.transactions.getByFilters.invalidate();
          notification("success");
        } catch (error) {
          if (error instanceof Error) {
            notification("error", error.message);
          }
        }
      },
      title: "Delete transaction",
    });
  }

  return (
    <>
      <Menu.Item
        leftSection={<FontAwesomeIcon icon={faEdit} />}
        onClick={() => onClickEdit(transaction.id)}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        color="red"
        leftSection={<FontAwesomeIcon icon={faTrash} />}
        onClick={handleDelete}
      >
        Delete
      </Menu.Item>
    </>
  );
}
