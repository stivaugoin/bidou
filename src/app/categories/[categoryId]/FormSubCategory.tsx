"use client";
import { SubmitButton } from "@/components/SubmitButton";
import { useRef } from "react";
import { createSubCategory } from "./createSubCategory";

type Props = {
  parentId: string;
  type: string;
};

export function FormSubCategory({ parentId, type }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);

  const handleCreateSubCategory = async (formData: FormData) => {
    await createSubCategory(formData);
    if (nameRef.current) nameRef.current.value = "";
  };

  return (
    <form
      action={handleCreateSubCategory}
      style={{ display: "flex", gap: "1rem" }}
    >
      <input type="hidden" name="parentId" value={parentId} />
      <input type="hidden" name="type" value={type} />
      <input name="name" ref={nameRef} type="text" />
      <SubmitButton>Add</SubmitButton>
    </form>
  );
}
