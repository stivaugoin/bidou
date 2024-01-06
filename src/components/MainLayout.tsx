import { AppShell, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import logoSrc from "../../public/logo-white.png";
import { AppMenuLinks } from "./AppMenuLinks";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      pt="lg"
    >
      <AppShell.Header>
        <Container h="100%">
          <Group h="100%" align="center">
            <Group justify="space-between" flex={1}>
              <Image alt="Bidou" src={logoSrc} height={20} width={120} />
              <Group gap="md" visibleFrom="sm">
                <AppMenuLinks />
              </Group>
            </Group>
            <Burger
              id="burgerBtn"
              hiddenFrom="sm"
              onClick={toggle}
              opened={opened}
              size="sm"
            />
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <AppMenuLinks mobile />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container>{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}
