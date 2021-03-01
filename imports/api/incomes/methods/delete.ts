import { ValidatedMethod } from "meteor/mdg:validated-method";
import { IncomeId, IncomesCollection } from "..";

export const deleteIncome = new ValidatedMethod({
  name: "incomes.delete",
  validate: null,
  run(incomeId: IncomeId) {
    if (!this.userId) {
      throw new Meteor.Error(
        403,
        "Access denied",
        "This application isn't public"
      );
    }

    IncomesCollection.remove({
      _id: incomeId,
    });
  },
});
