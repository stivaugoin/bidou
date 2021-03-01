import { ValidatedMethod } from "meteor/mdg:validated-method";
import { IIncome, IncomesCollection } from "..";

export type CreateIncomeProps = Pick<
  IIncome,
  "_id" | "amount" | "categoryId" | "comments" | "date"
>;

export const updateIncome = new ValidatedMethod({
  name: "incomes.udpdate",
  validate: null,
  run(income: CreateIncomeProps) {
    if (!this.userId) {
      throw new Meteor.Error(
        403,
        "Access denied",
        "This application isn't public."
      );
    }

    IncomesCollection.update(income._id, {
      $set: {
        ...income,
        updatedAt: new Date(),
        updatedBy: Meteor.userId() as UserId,
      },
    });
  },
});
