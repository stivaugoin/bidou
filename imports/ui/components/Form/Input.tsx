import cn from "classnames";
import { FieldHookConfig, useField } from "formik";
import React from "react";
import { FormField } from "../FormField";

type InputProps = FieldHookConfig<string> & {
  id: string;
  label: string;
  step?: HTMLInputElement["step"];
  type: HTMLInputElement["type"];
};

export function Input(props: InputProps): JSX.Element {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <FormField
      error={hasError ? meta.error : ""}
      id={props.id}
      label={props.label}
    >
      <input
        className={cn(
          {
            "form-field": !hasError,
            "form-field-error": hasError,
          },
          props.className
        )}
        id={props.id}
        step={props.step}
        type={props.type}
        {...field}
      />
    </FormField>
  );
}
