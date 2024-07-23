"use client";

import UseUser from "@/hooks/use-user";
import { paths } from "@/paths";
import { useRouter } from "next/navigation";
import { FC, Fragment, useEffect, useState } from "react";

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
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

    if (user) {
      router.replace(paths.platform.start);
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

export default GuestGuard;
