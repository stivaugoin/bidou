import { ValidatedMethod } from "meteor/mdg:validated-method";
import { IncomeId, IncomesCollection } from "..";

export const deleteIncome = new ValidatedMethod({
  name: "incomes.delete",
  validate: null,
  run(incomeId: IncomeId) {
    IncomesCollection.remove({
      _id: incomeId,
    });
  },
});
