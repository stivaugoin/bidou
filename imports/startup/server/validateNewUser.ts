import { Accounts } from "meteor/accounts-base";

Accounts.validateNewUser(
  (user: { services: { google: { email: string } } }) => {
    const { validEmails } = Meteor.settings;

    if (!validEmails.includes(user.services.google.email)) {
      throw new Meteor.Error(
        403,
        "Access denied",
        "This application isn't public"
      );
    }

    return true;
  }
);
