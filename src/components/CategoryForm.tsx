"use server";
import { Category, CategoryType } from "@prisma/client";
import { SubmitButton } from "./SubmitButton";

type Props = {
  action: (event: FormData) => void;
  category?: Category;
};

export async function CategoryForm({ action, category }: Props) {
  return (
    <form action={action}>
      {category && <input defaultValue={category.id} name="id" type="hidden" />}

      <div>
        <label htmlFor="name">Name</label>
        <input
          defaultValue={category?.name}
          id="name"
          name="name"
          type="text"
        />
      </div>

      <div>
        <label htmlFor="type">Type</label>
        <select defaultValue={category?.type} id="type" name="type">
          <option value="">Select type</option>
          <option value={CategoryType.Expense}>Expense</option>
          <option value={CategoryType.Income}>Income</option>
        </select>
      </div>

      <SubmitButton>{category ? "Save" : "Create"}</SubmitButton>
    </form>
  );
}
