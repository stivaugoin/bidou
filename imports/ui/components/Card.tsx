import React from "react";

type Props = {
  children: React.ReactNode;
};

export function Card({ children }: Props): JSX.Element {
  return (
    <div className="bg-white md:shadow md:rounded-lg p-4 md:p-8">
      {children}
    </div>
  );
}
