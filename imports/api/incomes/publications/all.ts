import { Meteor } from "meteor/meteor";
import { IncomesCollection } from "..";

Meteor.publish("incomes.all", function () {
  return IncomesCollection.find({});
});
