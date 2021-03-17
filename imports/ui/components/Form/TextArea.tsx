import cn from "classnames";
import { FieldHookConfig, useField } from "formik";
import React from "react";
import { FormField } from "../FormField";

type TextAreaProps = FieldHookConfig<string> & {
  id: string;
  label: string;
};

export function TextArea(props: TextAreaProps): JSX.Element {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <FormField
      error={hasError ? meta.error : ""}
      id={props.id}
      label={props.label}
    >
      <textarea
        className={cn(
          {
            "form-field": !hasError,
            "form-field-error": hasError,
          },
          props.className
        )}
        {...field}
      />
    </FormField>
  );
}
