import { FieldHookConfig, useField } from "formik";
import React from "react";
import DP from "react-datepicker";

type DatePickerProps = FieldHookConfig<Date> & {
  label: string;
};

export function DatePicker(props: DatePickerProps): JSX.Element {
  const [{ value, ...field }, meta, { setValue }] = useField(props);

  return (
    <div className="flex flex-col">
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <DP {...field} selected={value} onChange={(v) => setValue(v as Date)} />

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs">{meta.error}</p>
      )}
    </div>
  );
}
