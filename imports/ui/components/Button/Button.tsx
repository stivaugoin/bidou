import classNames from "classnames";
import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "destructive" | "primary" | "secondary";
}

export function Button({ children, variant, ...rest }: Props): JSX.Element {
  const isIcon = (() => {
    if (React.Children.count(children) > 1) {
      return false;
    }

    const [child] = React.Children.toArray(children);
    if (typeof child !== "string") {
      return true;
    }

    return false;
  })();

  return (
    <button
      className={classNames(
        "inline-flex items-center rounded-full shadow-sm border focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "px-5 py-2": !isIcon,
          "p-2": isIcon,
          "border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500":
            variant === "primary",
          "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500":
            variant === "secondary",
          "border-red-300 text-red-700 bg-white hover:bg-red-50 focus:ring-red-500":
            variant === "destructive",
        }
      )}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (typeof child === "string") {
          return child;
        }

        if (React.isValidElement(child)) {
          // Add the right size to icon
          return React.cloneElement(child, { className: "h-6 w-6" });
        }

        return child;
      })}
    </button>
  );
}
