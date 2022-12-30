import {
  faArrowTrendDown,
  faChartColumn,
  faEdit,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu } from "@mantine/core";

interface Props {
  onClickEdit: () => void;
}

export function CategoryListItemMenu({ onClickEdit }: Props) {
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

        <Menu.Item
          icon={<FontAwesomeIcon icon={faEdit} />}
          onClick={onClickEdit}
        >
          Edit
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
