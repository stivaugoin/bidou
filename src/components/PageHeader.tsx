import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { ActionIcon, Group, Title, useMantineTheme } from "@mantine/core";
import Link from "next/link";

interface PropsBackButton {
  backHref: string;
}

interface PropsIcon {
  icon: FontAwesomeIconProps["icon"];
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

  return (
    <Group mb="xl" mx={-theme.spacing.md} pb="md" position="apart" px="xl">
      <Group>
        {"backHref" in props && (
          <Link href={props.backHref} passHref>
            <ActionIcon component="a">
              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
            </ActionIcon>
          </Link>
        )}
        {"icon" in props && <FontAwesomeIcon icon={props.icon} size="xl" />}
        <Title size="h2">{title}</Title>
      </Group>
      {children}
    </Group>
  );
}
