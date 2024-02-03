import Link from "next/link";
import { deleteCategory } from "./deleteCategory";
import { getCategories } from "./getCategories";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1>Categories</h1>
      <Link href="categories/new">Create new category</Link>

      <section>
        <h2>Categories</h2>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Sub-categories</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category.id}>
                <td>
                  <Link href={`/categories/${category.id}`}>
                    {category.name}
                  </Link>
                </td>
                <td>{category.type}</td>
                <td>{category._count.children} sub-categories</td>
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
      </section>
    </div>
  );
}
