import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CategoriesCollection, ICategory } from "..";

export type CreateCategoryProps = Pick<ICategory, "_id" | "name" | "type">;

export const updateCategory = new ValidatedMethod({
  name: "categories.udpdate",
  validate: null,
  run(category: CreateCategoryProps) {
    if (!this.userId) {
      throw new Meteor.Error(
        403,
        "Access denied",
        "This application isn't public"
      );
    }

    CategoriesCollection.update(category._id, {
      $set: {
        ...category,
        updatedAt: new Date(),
        updatedBy: Meteor.userId() as UserId,
      },
    });
  },
});
