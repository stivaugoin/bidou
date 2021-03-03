import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary";
}

export function Button({ children, variant, ...rest }: Props): JSX.Element {
  return <button {...rest}>{children}</button>;
}
