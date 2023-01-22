import { Select } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useCategories } from "../hooks/useCategories";

interface Props extends React.ComponentPropsWithoutRef<typeof Select> {
  type: CategoryType;
}

export function SelectCategory({ type, ...props }: Omit<Props, "data">) {
  const categories = useCategories({ type });

  return (
    <Select
      clearable
      data={categories
        .map((category) => ({
          ...category,
          name: category.Parent?.name
            ? `${category.Parent?.name} - ${category.name}`
            : category.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      searchable
      {...props}
    />
  );
}
