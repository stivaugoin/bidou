import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Group, useMantineTheme } from "@mantine/core";
import { Category } from "@prisma/client";
import { CategoryListItemMenu } from "./CategoryListItemMenu";

interface Props {
  category: Pick<Category, "name" | "type">;
  isSubcategory?: boolean;
  onClickEdit: () => void;
}

export function CategoryListItemView({
  category,
  isSubcategory,
  onClickEdit,
}: Props) {
  const theme = useMantineTheme();

  return (
    <Group>
      {isSubcategory && (
        <Box>
          <FontAwesomeIcon
            color={theme.colors.gray[7]}
            fixedWidth
            icon={faTurnUp}
            rotation={90}
          />
        </Box>
      )}
      {category.name}
      <CategoryListItemMenu onClickEdit={onClickEdit} />
    </Group>
  );
}
