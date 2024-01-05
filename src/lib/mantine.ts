import { ButtonProps, InputProps, TableProps } from "@mantine/core";

const Button: Partial<ButtonProps> = {
  radius: "xl",
  size: "md",
};

// Use for all inputs type
const Input: Partial<InputProps> = {
  size: "md",
};

const Table: Partial<TableProps> = {
  fs: "md",
  highlightOnHover: true,
  horizontalSpacing: "md",
  verticalSpacing: "md",
};

export const defaultProps = {
  Button,
  Input,
  Table,
};
