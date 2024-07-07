import { Metadata, NextPage } from "next";
import { config } from "@/config";
import SignUpForm from "@/auth/sign-up/sign-up-form";
import GuestGuard from "@/auth/guest-guard";

export const metadata: Metadata = {
  title: `Sign up | Auth | ${config.site.name}`,
};

export default function Page() {
  return (
    <GuestGuard>
      <SignUpForm />
    </GuestGuard>
  );
}
