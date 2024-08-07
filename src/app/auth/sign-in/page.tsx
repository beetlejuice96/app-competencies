import { AuthLayout } from "@/auth/auth-layout";
import GuestGuard from "@/auth/guest-guard";
import SignInForm from "@/auth/sign-in/sign-in-form";
import { config } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sign in | Custom | Auth | ${config.site.name}`,
};

export default function SignInPage(): React.JSX.Element {
  return (
    <GuestGuard>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </GuestGuard>
  );
}
