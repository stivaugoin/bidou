import {
  CategoriesCollection,
  CategoryId,
  ICategory,
} from "../../api/categories";

export function getCategoryName(categoryId?: CategoryId): ICategory["name"] {
  const category = CategoriesCollection.findOne(categoryId);

  if (!category) {
    return "Uncategorized";
  }

  return category.name;
}
