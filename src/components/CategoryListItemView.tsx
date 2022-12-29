import { Group } from "@mantine/core";
import { inferRouterOutputs } from "@trpc/server";
import { CategoriesRouter } from "../server/trpc/categories";
import { CategoryListItemMenu } from "./CategoryListItemMenu";
import { SubcategoryPrefix } from "./SubcategoryPrefix";

interface Props {
  category: Optional<
    inferRouterOutputs<CategoriesRouter>["getAll"][number],
    "Children"
  >;
  isSubcategory?: boolean;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export function CategoryListItemView({
  category,
  isSubcategory,
  onClickEdit,
  onClickDelete,
}: Props) {
  return (
    <Group>
      {isSubcategory && <SubcategoryPrefix />}
      {category.name}
      <CategoryListItemMenu
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
    </Group>
  );
}
