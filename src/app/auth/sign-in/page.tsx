import SignInForm from "@/auth/sign-in/sign-in-form";
import { config } from "@/config";
import { Metadata } from "next";

// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: `Sign in | Custom | Auth | ${config.site.name}`,
};

export default function SignInPage(): React.JSX.Element {
  //TODO: agregar guest guard
  //TODO: cuando se le de estilo agregar un layout como devias kit
  // TODO: IMPLEMENTAR https://www.freecodecamp.org/news/set-up-authentication-in-apps-with-supabase/
  return (
    <>
      <SignInForm />
    </>
  );
}
