import { Stack } from "@mantine/core";
import { Category } from "@prisma/client";
import { Fragment } from "react";
import { CategoryListItem } from "./CategoryListItem";

interface Props {
  categories: (Pick<Category, "id" | "name" | "parentId" | "type"> & {
    Children: Pick<Category, "id" | "name" | "parentId" | "type">[];
  })[];
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
      {categories.map((category) => (
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
