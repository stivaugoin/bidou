"use client";
import { SubmitButton } from "@/components/SubmitButton";
import { useRef } from "react";
import { createSubcategory } from "../_utils/create-subcategory";

type Props = {
  parentId: string;
  type: string;
};

export function FormSubcategory({ parentId, type }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);

  const handleCreateSubcategory = async (formData: FormData) => {
    await createSubcategory(formData);
    if (nameRef.current) nameRef.current.value = "";
  };

  return (
    <form
      action={handleCreateSubcategory}
      style={{ display: "flex", gap: "1rem" }}
    >
      <input type="hidden" name="parentId" value={parentId} />
      <input type="hidden" name="type" value={type} />
      <input name="name" ref={nameRef} type="text" />
      <SubmitButton>Add</SubmitButton>
    </form>
  );
}
