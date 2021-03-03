import React from "react";
import { useHistory } from "react-router-dom";
import { CategoryId, ICategory } from "../../../../api/categories";
import { Button } from "/imports/ui/components/Button/Button";
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
    <Button
      onClick={() => history.push("/categories/create")}
      variant="primary"
    >
      Create category
    </Button>
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
                    <Button
                      onClick={() => history.push(`/categories/${_id}`)}
                      variant="secondary"
                    >
                      Edit
                    </Button>
                    <Button onClick={() => onDelete(_id)} variant="secondary">
                      Delete
                    </Button>
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
