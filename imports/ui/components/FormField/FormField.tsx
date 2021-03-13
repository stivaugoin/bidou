import React from "react";

type Props = {
  children: React.ReactNode;
  error?: string;
  id: string;
  label: string;
};

export function FormField({ children, error, id, label }: Props): JSX.Element {
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>

      <div className="mt-1">{children}</div>

      <div className="h-4 mt-1 mb-2">
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    </div>
  );
}
