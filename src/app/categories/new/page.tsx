import { FormCategory } from "@/app/categories/form-category";
import { createCategory } from "./createCategory";

export default async function CategoriesNew() {
  return (
    <div>
      <h1>New category</h1>
      <FormCategory action={createCategory} />
    </div>
  );
}
