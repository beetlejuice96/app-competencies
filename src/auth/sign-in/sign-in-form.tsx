"use client";

import { FC, useCallback, useState } from "react";
import { z as zod } from "zod";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { toast } from "@/core/toaster";
import Image from "next/image";
import SignInEmailForm from "./sign-in-email-form";
import SignInPhoneForm from "./sign-in-phone-form";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

interface OAuthProvider {
  id: "google";
  name: string;
  logo: React.ReactNode;
}

const oAuthProviders = [
  { id: "google", name: "Google", logo: <FaGoogle size={20} /> },
] satisfies OAuthProvider[];

const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod.string().min(1, { message: "Password is required" }),
});

const SignInForm: FC = () => {
  const [supabaseClient] = useState<SupabaseClient>(createSupabaseClient());
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isEmailForm, setIsEmailForm] = useState<boolean>(false);

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

  //TODO: agregar guest guard
  //TODO: cuando se le de estilo agregar un layout como devias kit
  // TODO: IMPLEMENTAR https://www.freecodecamp.org/news/set-up-authentication-in-apps-with-supabase/
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 bg-gray-100">
      {isEmailForm ? <SignInEmailForm /> : <SignInPhoneForm />}

      <p
        className="text-sm text-gray-500"
        style={{ color: "black", textAlign: "center" }}
      >
        or sign in with
      </p>
      <div className="flex flex-row items-center" style={{ maxWidth: "24rem" }}>
        {isEmailForm ? (
          <button
            // add class to icon button
            className="btn"
            onClick={() => setIsEmailForm(false)}
            disabled={isPending}
          >
            <MdOutlinePhone size={20} />
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => setIsEmailForm(true)}
            disabled={isPending}
          >
            <MdOutlineEmail size={20} />
          </button>
        )}
        {oAuthProviders.map((provider) => (
          <button
            className="btn"
            key={provider.id}
            onClick={() => onAuth(provider.id)}
            disabled={isPending}
          >
            {provider.logo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SignInForm;
