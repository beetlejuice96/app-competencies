import { Metadata, NextPage } from "next";
import { config } from "@/config";
import SignUpForm from "@/auth/sign-up/sign-up-form";

export const metadata: Metadata = {
  title: `Sign up | Auth | ${config.site.name}`,
};

export default function Page() {
  return <SignUpForm />;
}
