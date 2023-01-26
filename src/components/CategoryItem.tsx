import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Group, useMantineTheme } from "@mantine/core";
import { Category } from "@prisma/client";
import { trpc } from "../lib/trpc";
import { CategoryForm } from "./CategoryForm";

interface Props {
  data: Pick<Category, "id" | "name" | "parentId" | "type">;
  edit: boolean;
  onCloseEdit: () => void;
}

export function CategoryItem({ data, edit, onCloseEdit }: Props) {
  const mutation = trpc.categories.update.useMutation();
  const theme = useMantineTheme();

  if (edit) {
    return (
      <CategoryForm
        category={data}
        onCancel={onCloseEdit}
        onSubmit={async (category) => {
          await mutation.mutateAsync({ id: data.id, ...category });
          onCloseEdit();
        }}
      />
    );
  }

  return (
    <Group>
      {data.parentId !== null && (
        <Box>
          <FontAwesomeIcon
            color={theme.colors.gray[7]}
            fixedWidth
            icon={faTurnUp}
            rotation={90}
          />
        </Box>
      )}
      {data.name}
    </Group>
  );
}
