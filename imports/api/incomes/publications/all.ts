import { Meteor } from "meteor/meteor";
import { IncomesCollection } from "..";

Meteor.publish("incomes.all", function () {
  if (!this.userId) {
    this.ready();
  }

  return IncomesCollection.find();
});
