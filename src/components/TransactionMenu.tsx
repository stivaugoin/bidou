import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@mantine/core";
import { inferRouterOutputs } from "@trpc/server";
import { TransactionRouter } from "../server/trpc/transactions";

interface Props {
  onClickEdit: (transactionId: string) => void;
  transaction: inferRouterOutputs<TransactionRouter>["getByFilters"]["transactionsByMonth"][number]["transactions"][number];
}

export function TransactionMenu({ onClickEdit, transaction }: Props) {
  return (
    <>
      <Menu.Item
        icon={<FontAwesomeIcon icon={faEdit} />}
        onClick={() => onClickEdit(transaction.id)}
      >
        Edit
      </Menu.Item>
      <Menu.Item color="red" disabled icon={<FontAwesomeIcon icon={faTrash} />}>
        Delete (WIP)
      </Menu.Item>
    </>
  );
}
