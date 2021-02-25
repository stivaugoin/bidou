import { ValidatedMethod } from "meteor/mdg:validated-method";
import { ExpensesCollection, IExpense } from "..";

type Props = Pick<IExpense, "amount" | "categoryId" | "comments" | "date">;

export const createExpense = new ValidatedMethod({
  name: "expenses.create",
  validate: null,
  run(transaction: Props) {
    ExpensesCollection.insert({
      ...transaction,
      createdAt: new Date(),
      createdBy: Meteor.userId() as UserId,
    });
  },
});
