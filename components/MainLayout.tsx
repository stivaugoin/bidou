import {
  AppShell,
  Burger,
  Group,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBuildingCommunity,
  IconCategory,
  IconHomeDollar,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import logoSrc from "../public/logo-white.png";
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

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const theme = useMantineTheme();

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
        <Header height={HEADER_HEIGHT} p="md">
          <Group align="center" sx={{ height: "100%" }}>
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
