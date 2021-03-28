import * as React from "react";

export type SnackbarType = "error" | "success";
export type SnackbarNotification =
  | undefined
  | { message: string; type: SnackbarType };

type Context = {
  hideSnackbar: () => void;
  notification: SnackbarNotification;
  showSnackbar: (message: string, type: SnackbarType) => void;
};

const SnackbarContext = React.createContext<Context | undefined>(undefined);

export function SnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [
    notification,
    setNotification,
  ] = React.useState<SnackbarNotification>();

  const hideSnackbar = () => {
    setNotification(undefined);
  };

  const showSnackbar = (message: string, type: SnackbarType) => {
    setNotification({ message, type });
  };

  return (
    <SnackbarContext.Provider
      value={{ hideSnackbar, notification, showSnackbar }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): Context {
  const context = React.useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  return context;
}
