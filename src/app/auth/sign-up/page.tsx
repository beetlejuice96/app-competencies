import { Metadata, NextPage } from "next";
import { config } from "@/config";
import SignUpForm from "@/auth/sign-up/sign-up-form";
import GuestGuard from "@/auth/guest-guard";
import { AuthLayout } from "@/auth/auth-layout";

export const metadata: Metadata = {
  title: `Sign up | Auth | ${config.site.name}`,
};

export default function Page() {
  return (
    <GuestGuard>
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </GuestGuard>
  );
}
