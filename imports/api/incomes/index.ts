import { Mongo } from "meteor/mongo";
import { CategoryId } from "../categories";

export type IncomeId = Id<string, "Income">;

export interface IIncome extends ICollectionMeta {
  _id: IncomeId;
  amount: number;
  categoryId: CategoryId;
  comments?: string;
  date: Date;
}

export const IncomesCollection = new Mongo.Collection<IIncome>("incomes");

IncomesCollection.allow({
  insert: () => false,
  remove: () => false,
  update: () => false,
});
