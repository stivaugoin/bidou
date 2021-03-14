import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CategoriesCollection, CategoryId } from "..";
import { ExpensesCollection } from "../../expenses";
import { IncomesCollection } from "../../incomes";

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

    const category = CategoriesCollection.findOne(categoryId, {
      fields: { type: 1 },
    });

    // Remove relations
    if (category?.type === "expense") {
      ExpensesCollection.update(
        { categoryId },
        { $unset: { categoryId: true } }
      );
    }

    if (category?.type === "income") {
      IncomesCollection.update(
        { categoryId },
        { $unset: { categoryId: true } }
      );
    }

    // Remove document
    CategoriesCollection.remove({
      _id: categoryId,
    });
  },
});
