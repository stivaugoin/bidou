import { ServiceConfiguration } from "meteor/service-configuration";
import "./onCreateUser";
import "./publications";
import "./validateNewUser";

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    { service: "google" },
    { $set: Meteor.settings.oauth.google }
  );
});
