import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ICategory } from "../../../../api/categories";
import { Button } from "../../../components/Button";
import { Page } from "../../../components/Page";
import { IconArrowRight } from "/imports/ui/components/Icons/ArrowRight";
import { capitalize } from "/imports/utils/capitalize";

type CategoriesViewProps = {
  categories: Array<Pick<ICategory, "_id" | "name" | "type">>;
};

export function CategoriesList({
  categories,
}: CategoriesViewProps): JSX.Element {
  const history = useHistory();

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
              {/* Desktop */}
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
