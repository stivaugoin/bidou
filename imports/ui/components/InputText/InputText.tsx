import { FieldHookConfig, useField } from "formik";
import React from "react";

type InputTextProps = FieldHookConfig<string> & {
  label: string;
};

export function InputText(props: InputTextProps): JSX.Element {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col">
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <input {...field} />

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs">{meta.error}</p>
      )}
    </div>
  );
}
