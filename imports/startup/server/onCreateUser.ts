import { Accounts } from "meteor/accounts-base";

Accounts.onCreateUser((options, user) => {
  if (user?.services.google) {
    const {
      given_name: fname,
      family_name: lname,
      picture,
    } = user.services.google;

    return {
      ...user,
      profile: {
        fname,
        lname,
        picture,
      },
    };
  }

  user.profile = options.profile;

  return user;
});
