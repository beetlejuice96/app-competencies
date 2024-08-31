import { FC } from "react";
import AuthGuard from "@/auth/auth-guard";
import PlatformLayout from "@/platform/platform-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <AuthGuard>
      <PlatformLayout>{children}</PlatformLayout>
    </AuthGuard>
  );
};

export default Layout;
