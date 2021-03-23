import { Meteor } from "meteor/meteor";

Meteor.publish("users.others", function () {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find(
    { _id: { $ne: this.userId as UserId } },
    {
      fields: {
        _id: 1,
        "profile.fname": 1,
        "profile.lname": 1,
        "profile.picture": 1,
      },
    }
  );
});
