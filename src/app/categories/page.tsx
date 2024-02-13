import Link from "next/link";
import { deleteCategory } from "./_utils/delete-category";
import { getCategories } from "./_utils/get-categories";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1>Categories</h1>
      <Link href="categories/new">Create new category</Link>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Subcategories</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category.id}>
              <td>
                <Link href={`/categories/${category.id}`}>{category.name}</Link>
              </td>
              <td>{category.type}</td>
              <td>{category._count.children} subcategories</td>
              <td>
                <form action={deleteCategory}>
                  <input type="hidden" name="id" value={category.id} />
                  <button
                    disabled={category._count.children !== 0}
                    type="submit"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
