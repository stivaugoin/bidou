import cn from "classnames";
import { FieldHookConfig, useField } from "formik";
import React from "react";
import ReactDatePicker from "react-datepicker";
import { FormField } from "../FormField/FormField";

type DatePickerProps = FieldHookConfig<Date> & {
  id: string;
  label: string;
};

export function DatePicker(props: DatePickerProps): JSX.Element {
  const [{ value, ...field }, meta, { setValue }] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <FormField
      error={hasError ? meta.error : ""}
      id={props.id}
      label={props.label}
    >
      <ReactDatePicker
        className={cn(
          {
            "form-field": !hasError,
            "form-field-error": hasError,
          },
          props.className
        )}
        {...field}
        selected={value}
        onChange={(v) => setValue(v as Date)}
        wrapperClassName="w-full"
      />
    </FormField>
  );
}
