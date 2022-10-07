import {
  AppShell,
  Avatar,
  Burger,
  createStyles,
  Group,
  Header,
  MediaQuery,
  Menu,
  Navbar,
  NavLink,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBuildingCommunity,
  IconCategory,
  IconChevronDown,
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
  { href: "/providers", Icon: IconBuildingCommunity, label: "Providers" },
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
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Menu
                width={260}
                position="bottom-end"
                transition="pop-top-right"
                onClose={() => setOpened(false)}
                onOpen={() => setOpened(true)}
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: opened,
                    })}
                  >
                    <Group spacing={7}>
                      <Avatar
                        src={session.data?.user?.image}
                        alt={session.data?.user?.name as string}
                        radius="xl"
                        size={32}
                      />
                      <Text
                        weight={500}
                        size="sm"
                        sx={{ lineHeight: 1 }}
                        mr={3}
                      >
                        {session.data?.user?.name}
                      </Text>
                      <IconChevronDown size={12} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconLogout size={14} stroke={1.5} />}
                    onClick={() => signOut()}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </MediaQuery>
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
