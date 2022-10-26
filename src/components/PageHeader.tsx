import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { ActionIcon, Group, Title } from "@mantine/core";
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
  return (
    <Group mb="xl" position="apart">
      <Group align="center">
        {"backHref" in props && (
          <Link href={props.backHref} passHref>
            <ActionIcon component="a" size="lg">
              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
            </ActionIcon>
          </Link>
        )}
        {"icon" in props && <FontAwesomeIcon icon={props.icon} size="lg" />}
        <Title>{title}</Title>
      </Group>
      {children}
    </Group>
  );
}
