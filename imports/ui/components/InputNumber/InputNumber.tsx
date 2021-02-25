import { FieldHookConfig, useField } from "formik";
import React from "react";

type InputNumberProps = FieldHookConfig<number> & {
  label: string;
};

export function InputNumber(props: InputNumberProps): JSX.Element {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col">
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <input type="number" {...field} />

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs">{meta.error}</p>
      )}
    </div>
  );
}
