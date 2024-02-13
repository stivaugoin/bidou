import { FormCategory } from "@/app/categories/_components/form-category";
import { SubmitButton } from "@/components/SubmitButton";
import Link from "next/link";
import { FormSubcategory } from "../_components/form-subcategory";
import { deleteCategory } from "../_utils/delete-category";
import { deleteSubcategory } from "../_utils/delete-subcategory";
import { getCategory } from "../_utils/get-category";
import { updateCategory } from "../_utils/update-category";

type Props = {
  params: {
    categoryId: string;
  };
};

export default async function CategoryIdPage({ params }: Props) {
  const { categoryId } = params;
  const category = await getCategory(categoryId);

  return (
    <div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormCategory action={updateCategory} category={category} />

        <form action={deleteCategory}>
          <input type="hidden" name="id" value={category.id} />
          <button type="submit">Delete</button>
        </form>
      </div>
      <div>{category.type}</div>
      <div>
        Parent:{" "}
        {category.parent ? (
          <Link href={`/categories/${category.parent.id}`}>
            {category.parent.name}
          </Link>
        ) : (
          "None"
        )}
      </div>

      {!category.parentId && (
        <section>
          <h2>Sub-categories ({category.children.length})</h2>

          <FormSubcategory parentId={category.id} type={category.type} />

          <table style={{ marginTop: "2rem", width: "500px" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Name</th>
                <th style={{ width: "100px" }} />
              </tr>
            </thead>
            <tbody>
              {category.children.map((child) => (
                <tr key={child.id}>
                  <td>
                    <Link href={`/categories/${child.id}`}>{child.name}</Link>
                  </td>
                  <td>
                    <form action={deleteSubcategory}>
                      <input
                        type="hidden"
                        name="categoryId"
                        value={categoryId}
                      />
                      <input type="hidden" name="id" value={child.id} />
                      <SubmitButton>Delete</SubmitButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
