import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CategoriesCollection, ICategory } from "..";

export type CreateCategoryProps = Pick<ICategory, "name" | "type">;

export const createCategory = new ValidatedMethod({
  name: "categories.create",
  validate: null,
  run(category: CreateCategoryProps) {
    CategoriesCollection.insert({
      ...category,
      createdAt: new Date(),
      createdBy: Meteor.userId() as UserId,
    });
  },
});
