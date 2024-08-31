import { paths } from "@/paths";
import { INavItem } from "./nav-item.interface";

const verifyAuthenticatedOptions = (
  isAuthenticated: boolean
): Array<INavItem> =>
  isAuthenticated
    ? [
        { label: "Home", href: "/platform" },
        { label: "Perfil", href: "/me/profile" },
      ]
    : [{ label: "Login", href: paths.auth.signIn }];

export const navItems = (isAuthenticated: boolean): Array<INavItem> => {
  const authenticatedOptions = verifyAuthenticatedOptions(isAuthenticated);
  return [...authenticatedOptions];
};
