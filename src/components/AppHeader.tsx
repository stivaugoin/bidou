import {
  Box,
  Burger,
  Container,
  Group,
  Paper,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import logoSrc from "../../public/logo-white.png";
import classes from "./AppHeader.module.css";
import { AppMenuLinks } from "./AppMenuLinks";

export function AppHeader() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box mb="xl" className={classes.root}>
      <Container className={classes.header}>
        <Image alt="Bidou" src={logoSrc} height={20} width={120} />

        <Group gap="md" className={classes.links}>
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
    </Box>
  );
}
