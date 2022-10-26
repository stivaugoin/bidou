import { ButtonProps, InputProps } from "@mantine/core";

const Button: Partial<ButtonProps> = {
  radius: "xl",
  size: "md",
};

// Use for all inputs type
const Input: Partial<InputProps> = {
  size: "md",
};

export const defaultProps = {
  Button,
  Input,
};
