import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CategoriesCollection, CategoryId } from "..";

export const deleteCategory = new ValidatedMethod({
  name: "categories.delete",
  validate: null,
  run(categoryId: CategoryId) {
    if (!this.userId) {
      throw new Meteor.Error(
        403,
        "Access denied",
        "This application isn't public"
      );
    }

    CategoriesCollection.remove({
      _id: categoryId,
    });
  },
});
