import { Meteor } from "meteor/meteor";
import { CategoriesCollection } from "..";

Meteor.publish("categories.all", function () {
  const selector = {};

  return CategoriesCollection.find(selector);
});
