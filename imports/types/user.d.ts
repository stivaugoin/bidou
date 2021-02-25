type UserId = Id<string, "User">;

declare module "meteor/meteor" {
  namespace Meteor {
    interface User {
      _id: UserId;
    }
  }
}
