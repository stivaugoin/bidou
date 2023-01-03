import {
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Paper,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import logoSrc from "../../public/logo-white.png";
import { HEADER_HEIGHT } from "../utils/constant";
import { AppMenuLinks } from "./AppMenuLinks";

export function AppHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} mb="xl" className={classes.root}>
      <Container className={classes.header}>
        <Image alt="Bidou" src={logoSrc} height={20} width={120} />

        <Group spacing="md" className={classes.links}>
          <AppMenuLinks />
        </Group>

        <Burger
          id="burgerBtn"
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <AppMenuLinks mobile />
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}

const useStyles = createStyles((theme) => ({
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  root: {
    position: "sticky",
    zIndex: 900,
  },
}));
