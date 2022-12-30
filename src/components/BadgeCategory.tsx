import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Group } from "@mantine/core";
import { Category } from "@prisma/client";

interface Props {
  category: Pick<Category, "name"> & { Parent: Pick<Category, "name"> | null };
}

export default function BadgeCategory({ category }: Props) {
  return (
    <Group>
      <Badge color="gray" variant="filled">
        <Group spacing="xs">
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
