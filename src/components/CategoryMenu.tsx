import {
  faChartColumn,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@mantine/core";
import { useRouter } from "next/router";
import { MODULES } from "../utils/constant";

interface Props {
  categoryId: string;
  onClickEdit: () => void;
}

export function CategoryMenu({ categoryId, onClickEdit }: Props) {
  const router = useRouter();

  function handleViewTransactions() {
    router.push(`/transactions?categoryId=${categoryId}`);
  }

  return (
    <>
      <Menu.Label>View</Menu.Label>
      <Menu.Item
        icon={<FontAwesomeIcon icon={MODULES.transactions.icon} />}
        onClick={handleViewTransactions}
      >
        Transactions
      </Menu.Item>
      <Menu.Item disabled icon={<FontAwesomeIcon icon={faChartColumn} />}>
        Report (WIP)
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<FontAwesomeIcon icon={faEdit} />} onClick={onClickEdit}>
        Edit
      </Menu.Item>
      <Menu.Item color="red" disabled icon={<FontAwesomeIcon icon={faTrash} />}>
        Delete (WIP)
      </Menu.Item>
    </>
  );
}
