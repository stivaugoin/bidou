import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";

interface Props {
  onConfirmDelete: () => void;
}

export default function DeleteButton({ onConfirmDelete }: Props) {
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
    <ActionIcon color="red" onClick={openModal} size="lg" variant="subtle">
      <FontAwesomeIcon icon={faTrash} />
    </ActionIcon>
  );
}
