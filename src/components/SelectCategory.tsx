import { Select } from "@mantine/core";
import { useCategories, UseCategoriesProps } from "../hooks/useCategories";

type Props = React.ComponentPropsWithoutRef<typeof Select> & UseCategoriesProps;

export function SelectCategory({ type, ...props }: Omit<Props, "data">) {
  const categories = useCategories({ type, childrenOnly: true });

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
