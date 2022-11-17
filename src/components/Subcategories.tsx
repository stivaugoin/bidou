import { createStyles } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import Link from "next/link";
import useCategories from "../hooks/useCategories";
import Table from "./Table";

interface Props {
  categoryId: string;
}

export default function Subcategories({ categoryId }: Props) {
  const [categories] = useCategories(CategoryType.Expense);
  const { classes } = styles();

  return (
    <Table>
      <Table.Body highlightOnHover={false}>
        {categories
          ?.filter((category) => category.Parent?.id === categoryId)
          .map((category) => (
            <Link href={`/categories/${category.id}`} key={category.id}>
              <tr className={classes.row}>
                <td>{category.name}</td>
              </tr>
            </Link>
          ))}
      </Table.Body>
    </Table>
  );
}

const styles = createStyles(() => ({
  row: { cursor: "pointer" },
}));
