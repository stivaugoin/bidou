import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { Page } from "../../components/Page";
import { IconArrowRight } from "/imports/ui/components/Icons/ArrowRight";
import { useCategories } from "/imports/ui/hooks/useCategories";
import { capitalize } from "/imports/utils/capitalize";

export function CategoriesList(): JSX.Element {
  const history = useHistory();
  const categories = useCategories(
    {},
    {
      fields: { _id: 1, name: 1, type: 1 },
      sort: { type: 1, name: 1 },
    }
  );

  return (
    <Page
      header={{
        actions: [
          <Button
            key="create"
            onClick={() => history.push("/categories/create")}
            variant="primary"
          >
            NEW CATEGORY
          </Button>,
        ],
        title: "Categories",
      }}
    >
      <ul className="divide-y divide-gray-200 overflow-hidden md:rounded-lg">
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              to={`categories/${category._id}`}
              className="block px-4 py-4 bg-white hover:bg-gray-50"
            >
              <span className="flex justify-center items-center space-x-4">
                <span className="flex-1 grid grid-cols-4">
                  <span className="truncate font-medium col-span-3">
                    {category.name}
                  </span>
                  <span>{capitalize(category.type)}</span>
                </span>
                <IconArrowRight className="flex-shrink-0 h-5 w-5 text-gray-400" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
