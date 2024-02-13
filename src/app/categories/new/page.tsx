import { FormCategory } from "@/app/categories/_components/form-category";
import { createCategory } from "../_utils/create-category";

export default async function CategoriesNew() {
  return (
    <div>
      <h1>New category</h1>
      <FormCategory action={createCategory} />
    </div>
  );
}
