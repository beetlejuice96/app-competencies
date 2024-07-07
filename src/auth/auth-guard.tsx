import { config } from "@/config";
import UseUser from "@/hooks/use-user";
import { logger } from "@/lib/default-logger";
import { paths } from "@/paths";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

export interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();

  const { user, error, isLoading } = UseUser();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkPermissions = async () => {
    if (isLoading) {
      return;
    }
    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      logger.debug(
        "[AuthGuard]: User is not logged in, redirecting to sign in"
      );
      router.replace(paths.auth.signIn);
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    //TODO: reemplazar esto por un componente de error
    return <div>{error}</div>;
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
