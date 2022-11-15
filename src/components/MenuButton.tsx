import {
  faChevronDown,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps, createStyles, Group, Menu } from "@mantine/core";

const useStyles = createStyles((theme, props: ButtonProps) => {
  return {
    separator: {
      borderLeft: `1px solid ${
        ["filled", "light", "white"].includes(props.variant || "filled")
          ? theme.colors.dark[7]
          : "transparent"
      }`,
    },
  };
});

type Item = {
  icon?: IconDefinition;
  label: string;
  onClick: () => void;
};

interface MenuButtonProps extends ButtonProps {
  mainButton: Item;
  options: Required<Item>[];
}

export function MenuButton(props: MenuButtonProps) {
  const { mainButton, options, ...buttonProps } = props;
  const { classes } = useStyles(buttonProps);

  return (
    <Group position="right">
      <Button.Group>
        <Button {...buttonProps} onClick={mainButton.onClick}>
          {mainButton.label}
        </Button>
        <Menu position="bottom-end" transition="pop" withinPortal>
          <Menu.Target>
            <Button {...buttonProps} className={classes.separator}>
              <FontAwesomeIcon icon={faChevronDown} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {options.map((option) => (
              <Menu.Item
                icon={<FontAwesomeIcon icon={option.icon} />}
                key={option.label}
                onClick={option.onClick}
              >
                {option.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Button.Group>
    </Group>
  );
}
