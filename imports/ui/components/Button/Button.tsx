import classNames from "classnames";
import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary";
}

export function Button({ children, variant, ...rest }: Props): JSX.Element {
  return (
    <button
      className={classNames(
        "inline-flex items-center px-5 py-2 border text-base font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "border-transparent text-white bg-green-600 hover:bg-green-700":
            variant === "primary",
          "border-gray-300 text-gray-700 bg-white hover:bg-gray-50":
            variant === "secondary",
        }
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
