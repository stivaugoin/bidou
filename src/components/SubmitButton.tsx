"use client";
import { useFormStatus } from "react-dom";

type Props = {
  children: string;
};

export function SubmitButton({ children }: Props) {
  const status = useFormStatus();

  return (
    <button disabled={status.pending} type="submit">
      {status.pending ? "Loading..." : children}
    </button>
  );
}
