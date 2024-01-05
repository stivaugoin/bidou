import {
  faChartColumn,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useRouter } from "next/router";
import notification from "../lib/notification";
import { trpc } from "../lib/trpc";
import { MODULES } from "../utils/constant";

interface Props {
  categoryId: string;
  onClickEdit: () => void;
}

export function CategoryMenu({ categoryId, onClickEdit }: Props) {
  const router = useRouter();
  const mutation = trpc.categories.delete.useMutation();
  const trpcCtx = trpc.useContext();

  function handleDelete() {
    openConfirmModal({
      children: (
        <Text mb={32} size="sm">
          Are you sure you want to delete this category? This action cannot be
          undone.
        </Text>
      ),
      confirmProps: { color: "red" },
      labels: { confirm: "Delete category", cancel: "Cancel" },
      onConfirm: async () => {
        try {
          await mutation.mutateAsync({ id: categoryId });
          await trpcCtx.categories.getAll.invalidate();
          notification("success");
        } catch (error) {
          if (error instanceof Error) {
            notification("error", error.message);
          }
        }
      },
      title: "Delete category",
    });
  }

  function handleViewTransactions() {
    router.push(`/transactions?categoryId=${categoryId}`);
  }

  return (
    <>
      <Menu.Label>View</Menu.Label>
      <Menu.Item
        leftSection={<FontAwesomeIcon icon={MODULES.transactions.icon} />}
        onClick={handleViewTransactions}
      >
        Transactions
      </Menu.Item>
      <Menu.Item
        disabled
        leftSection={<FontAwesomeIcon icon={faChartColumn} />}
      >
        Report (WIP)
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        leftSection={<FontAwesomeIcon icon={faEdit} />}
        onClick={onClickEdit}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        leftSection={<FontAwesomeIcon icon={faTrash} />}
        onClick={handleDelete}
      >
        Delete
      </Menu.Item>
    </>
  );
}
