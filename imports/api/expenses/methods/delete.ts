import { ValidatedMethod } from "meteor/mdg:validated-method";
import { ExpenseId, ExpensesCollection } from "..";

export const deleteExpense = new ValidatedMethod({
  name: "expenses.delete",
  validate: null,
  run(expenseId: ExpenseId) {
    if (!this.userId) {
      throw new Meteor.Error(
        403,
        "Access denied",
        "This application isn't public"
      );
    }

    ExpensesCollection.remove({
      _id: expenseId,
    });
  },
});
