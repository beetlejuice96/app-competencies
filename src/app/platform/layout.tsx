import { FC } from "react";
import AuthGuard from "@/auth/auth-guard";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default Layout;
