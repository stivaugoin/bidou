import { ValidatedMethod } from "meteor/mdg:validated-method";
import { ExpensesCollection, IExpense } from "..";

export type CreateExpenseProps = Pick<
  IExpense,
  "_id" | "amount" | "categoryId" | "comments" | "date"
>;

export const updateExpense = new ValidatedMethod({
  name: "expenses.udpdate",
  validate: null,
  run(expense: CreateExpenseProps) {
    if (!this.userId) {
      throw new Meteor.Error(
        403,
        "Access denied",
        "This application isn't public"
      );
    }

    ExpensesCollection.update(expense._id, {
      $set: {
        ...expense,
        updatedAt: new Date(),
        updatedBy: Meteor.userId() as UserId,
      },
    });
  },
});
