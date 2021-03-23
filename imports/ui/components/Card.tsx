import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: Props): JSX.Element {
  return (
    <div
      className={classNames(
        "bg-white md:shadow md:rounded-lg p-4 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
