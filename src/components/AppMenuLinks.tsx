import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { MODULES } from "../utils/constant";
import classes from "./AppMenuLinks.module.css";

interface Props {
  mobile?: boolean;
}

export function AppMenuLinks({ mobile = false }: Props) {
  const router = useRouter();

  const displayLabel = (label: string, module: keyof typeof MODULES) => {
    if (mobile) return label;
    if (["settings", "signOut"].includes(module)) return;
    return label;
  };

  return (
    <>
      {Object.entries(MODULES).map(([module, link]) => (
        <Link href={link.href} key={link.href} passHref>
          <a
            aria-label={link.label}
            className={[
              classes.link,
              isActive(link.href, router.pathname) && classes["link--active"],
            ].join(" ")}
          >
            <Group gap="xs">
              <FontAwesomeIcon icon={link.icon} size="sm" />
              {displayLabel(link.label, module as keyof typeof MODULES)}
            </Group>
          </a>
        </Link>
      ))}
    </>
  );
}

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === href;
  return pathname.startsWith(href);
}
