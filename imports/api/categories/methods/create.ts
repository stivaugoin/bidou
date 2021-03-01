import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CategoriesCollection, ICategory } from "..";

export type CreateCategoryProps = Pick<ICategory, "name" | "type">;

export const createCategory = new ValidatedMethod({
  name: "categories.create",
  validate: null,
  run(category: CreateCategoryProps) {
    if (!this.userId) {
      throw new Meteor.Error(
        403,
        "Access denied",
        "This application isn't public"
      );
    }

    CategoriesCollection.insert({
      ...category,
      createdAt: new Date(),
      createdBy: Meteor.userId() as UserId,
    });
  },
});
