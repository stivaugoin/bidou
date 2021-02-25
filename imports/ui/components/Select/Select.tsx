import { FieldHookConfig, useField } from "formik";
import React from "react";

type SelectProps = FieldHookConfig<string> & {
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

export function Select(props: SelectProps): JSX.Element {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col">
      <label htmlFor={props.id || props.name}>{props.label}</label>

      <select {...field}>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs">{meta.error}</p>
      )}
    </div>
  );
}
