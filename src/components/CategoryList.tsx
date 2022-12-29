import { Stack } from "@mantine/core";
import { inferRouterOutputs } from "@trpc/server";
import { Fragment } from "react";
import { CategoriesRouter } from "../server/trpc/categories";
import { CategoryListItem } from "./CategoryListItem";

interface Props {
  categories: inferRouterOutputs<CategoriesRouter>["getAll"];
}

export function CategoryList({ categories }: Props) {
  return (
    <Stack
      spacing={0}
      sx={(theme) => ({
        borderRadius: theme.radius.md,
        border: theme.other.border,
        "& > *:not(:last-child)": {
          borderBottom: theme.other.border,
        },
      })}
    >
      {categories.map((category, index) => (
        <Fragment key={category.id}>
          <CategoryListItem category={category} />

          {category.Children.map((subcategory, i) => (
            <CategoryListItem category={subcategory} key={subcategory.id} />
          ))}
        </Fragment>
      ))}
    </Stack>
  );
}
