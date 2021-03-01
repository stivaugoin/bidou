import { Meteor } from "meteor/meteor";
import { CategoriesCollection } from "..";

Meteor.publish("categories.all", function () {
  if (!this.userId) {
    this.ready();
  }

  return CategoriesCollection.find();
});
