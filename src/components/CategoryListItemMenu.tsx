import {
  faChartColumn,
  faEdit,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu } from "@mantine/core";
import { MODULES } from "../utils/constant";

interface Props {
  onClickEdit: () => void;
  onClickViewTransactions: () => void;
}

export function CategoryListItemMenu({
  onClickEdit,
  onClickViewTransactions,
}: Props) {
  return (
    <Menu>
      <Menu.Target>
        <Button color="gray" ml="auto" size="sm" variant="subtle">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>View</Menu.Label>
        <Menu.Item
          icon={<FontAwesomeIcon icon={MODULES.transactions.icon} />}
          onClick={onClickViewTransactions}
        >
          Transactions
        </Menu.Item>
        <Menu.Item disabled icon={<FontAwesomeIcon icon={faChartColumn} />}>
          Report (WIP)
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          icon={<FontAwesomeIcon icon={faEdit} />}
          onClick={onClickEdit}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          color="red"
          disabled
          icon={<FontAwesomeIcon icon={faTrash} />}
        >
          Delete (WIP)
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
