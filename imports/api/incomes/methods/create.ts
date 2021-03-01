import { ValidatedMethod } from "meteor/mdg:validated-method";
import { IIncome, IncomesCollection } from "..";

type Props = Pick<IIncome, "amount" | "categoryId" | "comments" | "date">;

export const createIncome = new ValidatedMethod({
  name: "incomes.create",
  validate: null,
  run(transaction: Props) {
    if (!this.userId) {
      throw new Meteor.Error(
        403,
        "Access denied",
        "This application isn't public"
      );
    }

    IncomesCollection.insert({
      ...transaction,
      createdAt: new Date(),
      createdBy: Meteor.userId() as UserId,
    });
  },
});
