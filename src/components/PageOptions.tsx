import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Menu, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";

interface Props {
  onConfirmDelete: () => void;
}

export default function PageOptions({ onConfirmDelete }: Props) {
  const openModal = () =>
    openConfirmModal({
      title: `Are you sure you want to delete this entity?`,
      children: <Text size="sm">This action cannot be reverted.</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: {
        color: "red",
      },
      onConfirm: onConfirmDelete,
    });

  return (
    <Menu width={200}>
      <Menu.Target>
        <ActionIcon size="lg">
          <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          color="red"
          icon={<FontAwesomeIcon icon={faTrash} />}
          onClick={openModal}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
