import GuestGuard from "@/auth/guest-guard";
import SignUpOtpPhoneForm from "@/auth/sign-up/sign-up-otp-phone-form";
import { config } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sign up otp | Auth | ${config.site.name}`,
};

export default function Page() {
  return (
    <GuestGuard>
      <SignUpOtpPhoneForm />
    </GuestGuard>
  );
}
