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
  fontSize: "md",
  highlightOnHover: true,
  verticalSpacing: "md",
};

export const defaultProps = {
  Button,
  Input,
  Table,
};
