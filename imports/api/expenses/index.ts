import { Mongo } from "meteor/mongo";
import { CategoryId } from "../categories";

export type ExpenseId = Id<string, "Expense">;

export interface IExpense extends ICollectionMeta {
  _id: ExpenseId;
  amount: number;
  categoryId: CategoryId;
  comments?: string;
  date: Date;
}

export const ExpensesCollection = new Mongo.Collection<IExpense>("expenses");
