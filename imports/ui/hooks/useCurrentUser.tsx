import { useTracker } from "meteor/react-meteor-data";

export function useCurrentUser(): Meteor.User | null {
  return useTracker(() => Meteor.user());
}
