import {
  faArrowTrendDown,
  faArrowTrendUp,
  faChartColumn,
  faEdit,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu } from "@mantine/core";
import { CategoryType } from "@prisma/client";

interface Props {
  onClickEdit: () => void;
  type: CategoryType;
}

export function CategoryListItemMenu({ onClickEdit, type }: Props) {
  const transactionIcon =
    type === CategoryType.Expense ? faArrowTrendDown : faArrowTrendUp;

  return (
    <Menu>
      <Menu.Target>
        <Button color="gray" ml="auto" size="sm" variant="subtle">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>View</Menu.Label>
        <Menu.Item icon={<FontAwesomeIcon icon={transactionIcon} />}>
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
