import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Flex, Menu, Stack, Text } from "@mantine/core";

type Item<T> = { id: string } & T;

interface ListProps<T> {
  data: Item<T>[];
  renderItem: (item: Item<T>, index: number) => React.ReactNode;
  renderMenu?: (item: Item<T>, index: number) => React.ReactNode;
}

export function List<T>({ data, renderItem, renderMenu }: ListProps<T>) {
  return (
    <Stack
      role="list"
      spacing={0}
      sx={(theme) => ({
        borderRadius: theme.radius.md,
        border: theme.other.border,
        "& > *:not(:last-child)": {
          borderBottom: theme.other.border,
        },
      })}
    >
      <>
        {!data ||
          (data.length === 0 && (
            <Box p="md" sx={{ textAlign: "center" }}>
              <Text color="dimmed" italic>
                No data
              </Text>
            </Box>
          ))}

        {data.map((item, index) => {
          const menu = renderMenu?.(item, index);

          return (
            <Flex
              align="center"
              key={item.id}
              gap="md"
              p={Boolean(renderMenu) ? "sm" : "md"}
            >
              <Box sx={{ flex: 1 }}>{renderItem(item, index)}</Box>

              {Boolean(menu) && (
                <Box ml="auto" w={42}>
                  <Menu>
                    <Menu.Target>
                      <Button color="gray" ml="auto" size="sm" variant="subtle">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </Button>
                    </Menu.Target>

                    <Menu.Dropdown>{menu}</Menu.Dropdown>
                  </Menu>
                </Box>
              )}
            </Flex>
          );
        })}
      </>
    </Stack>
  );
}
