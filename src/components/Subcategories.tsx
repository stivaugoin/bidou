import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { CategoryType } from "@prisma/client";
import router from "next/router";
import useCategories from "../hooks/useCategories";
import { MenuButton } from "./MenuButton";
import Table from "./Table";

interface Props {
  categoryId: string;
}

export default function Subcategories({ categoryId }: Props) {
  const [categories] = useCategories(CategoryType.Expense);

  return (
    <Table>
      <Table.Body highlightOnHover={false}>
        {categories
          ?.filter((category) => category.Parent?.id === categoryId)
          .map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <MenuButton
                  color="gray"
                  mainButton={{
                    label: "View",
                    onClick: () => router.push(`/categories/${category.id}`),
                  }}
                  options={[
                    {
                      icon: faPencil,
                      label: "Edit",
                      onClick: () =>
                        router.push(`/categories/${category.id}/edit`),
                    },
                  ]}
                  size="xs"
                />
              </td>
            </tr>
          ))}
      </Table.Body>
    </Table>
  );
}
