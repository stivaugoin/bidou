import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Flex, Menu, Stack, Text } from "@mantine/core";
import classes from "./List.module.css";

type Item<T> = { id: string } & T;

interface ListProps<T> {
  data: Item<T>[];
  renderItem: (item: Item<T>, index: number) => React.ReactNode;
  renderMenu?: (item: Item<T>, index: number) => React.ReactNode;
}

export function List<T>({ data, renderItem, renderMenu }: ListProps<T>) {
  return (
    <Stack className={classes.list} gap={0} role="list">
      <>
        {(!data || data.length === 0) && (
          <Box p="md" ta="center">
            <Text c="dimmed" fs="italic">
              No data
            </Text>
          </Box>
        )}

        {data.map((item, index) => {
          const menu = renderMenu?.(item, index);

          return (
            <Flex
              align="center"
              key={item.id}
              gap="md"
              p={Boolean(renderMenu) ? "sm" : "md"}
            >
              <Box flex={1}>{renderItem(item, index)}</Box>

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
