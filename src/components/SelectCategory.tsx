import { Select } from "@mantine/core";
import { useCategories, UseCategoriesProps } from "../hooks/useCategories";

type Props = React.ComponentPropsWithoutRef<typeof Select> &
  UseCategoriesProps & {
    labelNoValue?: string;
  };

export function SelectCategory({
  filterCategory,
  labelNoValue,
  type,
  ...props
}: Omit<Props, "data">) {
  const categories = useCategories({ filterCategory, type });

  const data = [
    ...(labelNoValue
      ? [
          {
            label: labelNoValue,
            value: "",
          },
        ]
      : []),
    ...categories
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
      })),
  ];

  return (
    <Select clearable data={data} searchable variant="filled" {...props} />
  );
}
