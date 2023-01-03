import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, Group } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { MODULES } from "../utils/constant";

interface Props {
  mobile?: boolean;
}

export function AppMenuLinks({ mobile = false }: Props) {
  const { classes, cx } = useStyles();
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
            className={cx(classes.link, {
              [classes.linkActive]: isActive(link.href, router.pathname),
            })}
          >
            <Group spacing="xs">
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

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    padding: `0 ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colors.dark[0],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
    minHeight: "32px",

    "&:hover": {
      backgroundColor: theme.colors.dark[6],
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
      color: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).color,
    },
  },
}));
