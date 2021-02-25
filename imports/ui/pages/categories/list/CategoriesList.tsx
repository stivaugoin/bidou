import React from "react";
import { useHistory } from "react-router-dom";
import { CategoryId, ICategory } from "../../../../api/categories";
import { capitalize } from "/imports/utils/capitalize";

type CategoriesViewProps = {
  categories: Array<Pick<ICategory, "_id" | "name" | "type">>;
  onDelete: (categoryId: CategoryId) => void;
};

export function CategoriesList({
  categories,
  onDelete,
}: CategoriesViewProps): JSX.Element {
  const history = useHistory();

  const renderAddButton = () => (
    <button onClick={() => history.push("/categories/create")}>
      Create category
    </button>
  );

  return (
    <div className="flex flex-col space-y-4">
      {categories.length === 0 && (
        <div>
          <p>No category found</p>
          {renderAddButton()}
        </div>
      )}

      {categories.length > 0 && (
        <>
          <div>{renderAddButton()}</div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {categories.map(({ _id, name, type }) => (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{capitalize(type)}</td>
                  <td>
                    <button onClick={() => history.push(`/categories/${_id}`)}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
