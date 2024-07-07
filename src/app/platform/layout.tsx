import AuthGuard from "@/auth/auth-guard";
import { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default Layout;
