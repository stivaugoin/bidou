import {
  faArrowTrendDown,
  faArrowTrendUp,
  faFolderTree,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
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
import Link from "next/link";
import { useRouter } from "next/router";
import logoSrc from "../../public/logo-white.png";
import { HEADER_HEIGHT } from "../utils/constant";

const LINKS = [
  { href: "/", icon: faHome, label: "Dashboard" },
  { href: "/incomes", icon: faArrowTrendUp, label: "Incomes" },
  { href: "/expenses", icon: faArrowTrendDown, label: "Expenses" },
  { href: "/categories", icon: faFolderTree, label: "Categories" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === href;
  return pathname.startsWith(href);
}

const useStyles = createStyles((theme) => ({
  root: {
    position: "sticky",
    zIndex: 100,
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

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export default function AppHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const router = useRouter();

  const items = LINKS.map((link) => (
    <Link href={link.href} key={link.href} passHref>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: isActive(link.href, router.pathname),
        })}
      >
        {link.label}
      </a>
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb="xl" className={classes.root}>
      <Container className={classes.header}>
        <Image alt="Bidou" src={logoSrc} height={20} width={120} />
        <Group spacing="md" className={classes.links}>
          {items}
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
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
