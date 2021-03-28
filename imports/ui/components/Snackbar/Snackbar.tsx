import { Alert, Transition } from "@headlessui/react";
import classNames from "classnames";
import React from "react";
import { IconCheckmark } from "../Icons/Checkmark";
import { SnackbarNotification, useSnackbar } from "./context";

export function Snackbar(): JSX.Element {
  const { hideSnackbar, notification } = useSnackbar();
  const [
    displayNotification,
    setDisplayNotification,
  ] = React.useState<SnackbarNotification>();

  React.useEffect(() => {
    if (notification) {
      setDisplayNotification(notification);

      setTimeout(() => {
        hideSnackbar();

        setTimeout(() => {
          setDisplayNotification(undefined);
        }, 600);
      }, 3000);
    }
  }, [hideSnackbar, notification]);

  return (
    <Transition
      show={Boolean(notification)}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Alert
        className="fixed bottom-4 left-1/2 max-w-lg min-w-min transform -translate-x-1/2"
        importance="polite"
      >
        <div
          className={classNames("rounded-md border p-4", {
            "border-red-400 bg-red-50": displayNotification?.type === "error",
            "border-green-400 bg-green-50":
              displayNotification?.type === "success",
          })}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <IconCheckmark
                className={classNames("h-5 w-5", {
                  "text-red-400": displayNotification?.type === "error",
                  "text-green-400": displayNotification?.type === "success",
                })}
              />
            </div>
            <div className="ml-3">
              <p
                className={classNames("text-sm font-medium", {
                  "text-red-800": displayNotification?.type === "error",
                  "text-green-800": displayNotification?.type === "success",
                })}
              >
                {displayNotification?.message}
              </p>
            </div>
          </div>
        </div>
      </Alert>
    </Transition>
  );
}
