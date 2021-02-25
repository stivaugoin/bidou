import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import "/imports/startup/both";
import "/imports/startup/client";
import { App } from "/imports/ui/App";

Meteor.startup(() => {
  render(<App />, document.getElementById("react-target"));
});
