import { ValidatedMethod } from "meteor/mdg:validated-method";
import { ExpensesCollection, IExpense } from "..";

type Props = Pick<IExpense, "amount" | "categoryId" | "comments" | "date">;

export const createExpense = new ValidatedMethod({
  name: "expenses.create",
  validate: null,
  run(transaction: Props) {
    if (!this.userId) {
      throw new Meteor.Error(
        403,
        "Access denied",
        "This application isn't public"
      );
    }

    ExpensesCollection.insert({
      ...transaction,
      createdAt: new Date(),
      createdBy: Meteor.userId() as UserId,
    });
  },
});
