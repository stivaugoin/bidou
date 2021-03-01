import { Meteor } from "meteor/meteor";
import { ExpensesCollection } from "..";

Meteor.publish("expenses.all", function () {
  if (!this.userId) {
    this.ready();
  }

  return ExpensesCollection.find();
});
