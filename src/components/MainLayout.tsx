import {
  AppShell,
  Burger,
  createStyles,
  Group,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCategory,
  IconHomeDollar,
  IconLogout,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import logoSrc from "../../public/logo-white.png";
import { HEADER_HEIGHT } from "../utils/constant";

const LINKS = [
  { href: "/", Icon: IconHomeDollar, label: "Dashboard" },
  { href: "/incomes", Icon: IconTrendingUp, label: "Incomes" },
  { href: "/expenses", Icon: IconTrendingDown, label: "Expenses" },
  { href: "/categories", Icon: IconCategory, label: "Categories" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === href;
  return pathname.startsWith(href);
}

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { classes, theme, cx } = useStyles();
  const largerThanSm = useMediaQuery("(min-width: 769px)");
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const session = useSession();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          p="md"
          width={{ sm: 200, lg: 300 }}
        >
          {LINKS.map(({ href, Icon, label }) => (
            <Link href={href} key={href} passHref>
              <NavLink
                icon={<Icon size={16} stroke={1.5} />}
                component="a"
                label={label}
                active={isActive(href, router.pathname)}
              />
            </Link>
          ))}

          <NavLink
            icon={<IconLogout size={16} stroke={1.5} />}
            component="button"
            label="Logout"
            onClick={() => signOut()}
            sx={{ marginTop: "auto" }}
          />
        </Navbar>
      }
      header={
        <Header height={HEADER_HEIGHT} px="md">
          <Group
            align="center"
            position={largerThanSm ? "apart" : "left"}
            sx={{ height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                color={theme.colors.gray[6]}
                id="burgerBtn"
                mr="xl"
                onClick={() => setOpened((o) => !o)}
                opened={opened}
                size="sm"
              />
            </MediaQuery>
            <Image alt="Bidou" src={logoSrc} height={20} width={120} />
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
