import { Group } from "@mantine/core";
import { Category } from "@prisma/client";
import { CategoryListItemMenu } from "./CategoryListItemMenu";
import { SubcategoryPrefix } from "./SubcategoryPrefix";

interface Props {
  category: Pick<Category, "name">;
  isSubcategory?: boolean;
  onClickEdit: () => void;
}

export function CategoryListItemView({
  category,
  isSubcategory,
  onClickEdit,
}: Props) {
  return (
    <Group>
      {isSubcategory && <SubcategoryPrefix />}
      {category.name}
      <CategoryListItemMenu onClickEdit={onClickEdit} />
    </Group>
  );
}
