import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, useMantineTheme } from "@mantine/core";

export function SubcategoryPrefix() {
  const theme = useMantineTheme();

  return (
    <Box ml="xs">
      <FontAwesomeIcon
        color={theme.colors.gray[7]}
        fixedWidth
        icon={faTurnUp}
        rotation={90}
      />
    </Box>
  );
}
