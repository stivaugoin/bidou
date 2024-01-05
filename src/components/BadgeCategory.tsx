import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Group } from "@mantine/core";
import { Category, CategoryType } from "@prisma/client";

interface Props {
  category: Pick<Category, "name" | "type"> & {
    Parent: Pick<Category, "name" | "type"> | null;
  };
}

export default function BadgeCategory({ category }: Props) {
  return (
    <Group>
      <Badge
        color={category.type === CategoryType.Expense ? "red" : "green"}
        variant="light"
      >
        <Group gap="xs">
          {"Parent" in category && category.Parent?.name && (
            <>
              {category.Parent.name}
              <FontAwesomeIcon icon={faArrowRight} />
            </>
          )}
          {category.name}
        </Group>
      </Badge>
    </Group>
  );
}
