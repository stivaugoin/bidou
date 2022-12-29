import {
  faArrowTrendDown,
  faChartColumn,
  faEdit,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu } from "@mantine/core";

interface Props {
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export function CategoryListItemMenu({ onClickEdit, onClickDelete }: Props) {
  return (
    <Menu>
      <Menu.Target>
        <Button color="gray" ml="auto" size="sm" variant="subtle">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>View</Menu.Label>
        <Menu.Item icon={<FontAwesomeIcon icon={faArrowTrendDown} />}>
          Transactions
        </Menu.Item>
        <Menu.Item icon={<FontAwesomeIcon icon={faChartColumn} />}>
          Report
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          icon={<FontAwesomeIcon icon={faEdit} />}
          onClick={onClickEdit}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<FontAwesomeIcon icon={faTrash} />}
          onClick={onClickDelete}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
