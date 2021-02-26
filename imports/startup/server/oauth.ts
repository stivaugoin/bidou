import { Meteor } from "meteor/meteor";
import { ServiceConfiguration } from "meteor/service-configuration";

Meteor.startup(() => {
  const { google } = Meteor.settings.oauth;

  ServiceConfiguration.configurations.upsert(
    { service: "google" },
    { $set: google }
  );
});
