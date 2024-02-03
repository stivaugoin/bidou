import { CategoryForm } from "@/components/CategoryForm";
import { createCategory } from "./createCategory";

export default async function CategoriesNew() {
  return (
    <div>
      <h1>New category</h1>
      <CategoryForm action={createCategory} />
    </div>
  );
}
