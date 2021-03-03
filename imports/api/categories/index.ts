import { Mongo } from "meteor/mongo";

export type CategoryId = Id<string, "Category">;

export interface ICategory extends ICollectionMeta {
  _id: CategoryId;
  defaultUserId?: UserId;
  name: string;
  type: "expense" | "income";
}

export const CategoriesCollection = new Mongo.Collection<ICategory>(
  "categories"
);

CategoriesCollection.allow({
  insert: () => false,
  remove: () => false,
  update: () => false,
});
