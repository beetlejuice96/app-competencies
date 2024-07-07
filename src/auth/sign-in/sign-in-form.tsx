"use client";

import { FC, useCallback, useState } from "react";
import { z as zod } from "zod";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { toast } from "@/core/toaster";
import Image from "next/image";

// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface OAuthProvider {
  id: "google";
  name: string;
  logo: string;
}

const oAuthProviders = [
  { id: "google", name: "Google", logo: "/assets/logo-google.svg" },
] satisfies OAuthProvider[];

const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod.string().min(1, { message: "Password is required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: "", password: "" } satisfies Values;

const SignInForm: FC = () => {
  const [supabaseClient] = useState<SupabaseClient>(createSupabaseClient());
  const [isPending, setIsPending] = useState<boolean>(false);

  const router = useRouter();

  const onAuth = useCallback(
    async (providerId: OAuthProvider["id"]): Promise<void> => {
      setIsPending(true);

      const redirectToUrl = new URL(
        paths.auth.callback.pkce,
        window.location.origin
      );
      redirectToUrl.searchParams.set("next", paths.platform.start);

      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: providerId,
        options: { redirectTo: redirectToUrl.href },
      });

      if (error) {
        setIsPending(false);
        toast.error(error.message);
        return;
      }

      window.location.href = data.url;
    },
    [supabaseClient]
  );

  //   const onSubmit = useCallback(
  //     async (values: Values): Promise<void> => {
  //       setIsPending(true);

  //       const { error } = await supabaseClient.auth.signInWithPassword({
  //         email: values.email,
  //         password: values.password,
  //       });

  //       if (error) {
  //         if (error.message.includes("Email not confirmed")) {
  //           // You should resend the verification email.
  //           // For the sake of simplicity, we will just redirect to the confirmation page.
  //           const searchParams = new URLSearchParams({ email: values.email });
  //           router.push(
  //             `${paths.auth.supabase.signUpConfirm}?${searchParams.toString()}`
  //           );
  //         } else {
  //           //   setError("root", { type: "server", message: error.message });
  //           setIsPending(false);
  //         }
  //       } else {
  //         // UserProvider will handle Router refresh
  //         // After refresh, GuestGuard will handle the redirect
  //       }
  //     },
  //     [supabaseClient, router]
  //   );

  //TODO: agregar guest guard
  //TODO: cuando se le de estilo agregar un layout como devias kit
  // TODO: IMPLEMENTAR https://www.freecodecamp.org/news/set-up-authentication-in-apps-with-supabase/
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center" style={{ color: "black" }}>
        Sign in
      </h1>
      <div
        className="flex flex-col items-center justify-center w-full p-4 space-y-4 bg-white rounded-md shadow-md"
        style={{ maxWidth: "24rem" }}
      >
        {oAuthProviders.map((provider) => (
          <button
            className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white bg-blue-500 rounded-md"
            key={provider.id}
            onClick={() => onAuth(provider.id)}
            disabled={isPending}
          >
            <Image
              className="rounded-full"
              src={provider.logo}
              alt={provider.name}
              width={24}
              height={24}
            />
            Sign in with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SignInForm;
