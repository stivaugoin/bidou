import { Meteor } from "meteor/meteor";
import { ExpensesCollection } from "..";

Meteor.publish("expenses.all", function () {
  return ExpensesCollection.find({});
});
