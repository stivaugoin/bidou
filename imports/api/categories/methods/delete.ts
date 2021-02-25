import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CategoriesCollection, CategoryId } from "..";

export const deleteCategory = new ValidatedMethod({
  name: "categories.delete",
  validate: null,
  run(categoryId: CategoryId) {
    CategoriesCollection.remove({
      _id: categoryId,
    });
  },
});
