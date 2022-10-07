import { ActionIcon, Group, Title, useMantineTheme } from "@mantine/core";
import { IconChevronLeft, TablerIcon } from "@tabler/icons";
import Link from "next/link";

interface PropsBackButton {
  backHref: string;
}

interface PropsIcon {
  icon: TablerIcon;
}

interface Props {
  children?: React.ReactNode;
  title: string;
}

export default function PageHeader({
  children,
  title,
  ...props
}: Props & (PropsBackButton | PropsIcon)) {
  const theme = useMantineTheme();
  const Icon = "icon" in props ? props.icon : null;

  return (
    <Group mb="xl" mx={-theme.spacing.md} pb="md" position="apart" px="xl">
      <Group>
        {"backHref" in props && (
          <Link href={props.backHref} passHref>
            <ActionIcon component="a">
              <IconChevronLeft size={24} />
            </ActionIcon>
          </Link>
        )}
        {Icon && <Icon size={24} />}
        <Title size="h2">{title}</Title>
      </Group>
      {children}
    </Group>
  );
}
