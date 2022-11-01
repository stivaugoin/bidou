import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles } from "@mantine/core";
import Link from "next/link";
import { ApiGetCategories } from "../server/categories";

interface CategoriesRowProps {
  category: ApiGetCategories[number];
}

export default function CategoriesRow({ category }: CategoriesRowProps) {
  const { classes } = styles();

  return (
    <Link href={`/categories/${category.id}`}>
      <tr className={classes.row}>
        <td className={classes.cell}>{category.name}</td>
        <td className={classes.cell}>
          {category.Children.length > 0 &&
            `${category.Children.length} subcategories`}
        </td>
        <td className={classes.lastCell}>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </td>
      </tr>
    </Link>
  );
}

const styles = createStyles(() => ({
  cell: { width: "33%" },
  lastCell: { width: "33%", textAlign: "right" },
  row: { cursor: "pointer" },
}));
