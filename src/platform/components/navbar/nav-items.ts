import { paths } from "@/paths";
import { INavItem } from "./nav-item.interface";

const verifyAuthenticatedOptions = (
  isAuthenticated: boolean
): Array<INavItem> =>
  isAuthenticated
    ? [
        { label: "Perfil", href: "/me/profile" },
        {
          label: "My inscriptions",
          href: "/me/inscriptions",
        },
      ]
    : [];

export const navItems = (isAuthenticated: boolean): Array<INavItem> => {
  const authenticatedOptions = verifyAuthenticatedOptions(isAuthenticated);
  return [
    {
      label: "Home",
      href: "/home",
    },
    ...authenticatedOptions,
    {
      label: "Tournaments",
      href: "/tournaments",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "FAQ",
      href: "/faq",
    },
  ];
};
