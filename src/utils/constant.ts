import {
  faCogs,
  faFolderTree,
  faHome,
  faList,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

export const HEADER_HEIGHT = 60;

export const MODULES = {
  dashboard: {
    href: "/",
    icon: faHome,
    label: "Dashboard",
  },
  transactions: {
    href: "/transactions",
    icon: faList,
    label: "Transactions",
  },
  categories: {
    href: "/categories",
    icon: faFolderTree,
    label: "Categories",
  },
  settings: {
    href: "/settings",
    icon: faCogs,
    label: "Settings",
  },
  signOut: {
    href: "/sign-out",
    icon: faSignOut,
    label: "Sign out",
  },
};

export const MONTH_YEAR = "MMM YYYY";

// TODO: Add currency and locale in user settings
export const CURRENCY = "CAD";
export const LOCALE = "en-US";
