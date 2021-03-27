import { Accounts } from "meteor/accounts-base";
import { CategoriesCollection } from "/imports/api/categories";

Accounts.onCreateUser((_, user) => {
  if (!user?.services.google) {
    // Only Google is accepted
    throw new Meteor.Error(403, "Access denied");
  }

  const { validEmails } = Meteor.settings;

  if (validEmails && !validEmails.includes(user.services.google.email)) {
    throw new Meteor.Error(
      403,
      "Access denied",
      "This application isn't public"
    );
  }

  const {
    email,
    given_name: fname,
    family_name: lname,
    picture,
  } = user.services.google;

  // Create a category for deposit by this user
  const categoryExists =
    CategoriesCollection.find(
      { defaultUserId: user._id },
      { fields: { _id: 1 }, limit: 1 }
    ).count() > 0;

  if (!categoryExists) {
    CategoriesCollection.insert({
      createdAt: new Date(),
      createdBy: user._id,
      defaultUserId: user._id,
      name: `Deposit by ${fname} ${lname}`,
      type: "income",
    });
  }

  // Return the new user
  return {
    ...user,
    emails: [{ address: email, verified: true }],
    profile: { fname, lname, picture },
  };
});
