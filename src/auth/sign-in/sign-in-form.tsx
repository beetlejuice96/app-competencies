"use client";

import { FC, useCallback, useState } from "react";
import { z as zod } from "zod";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { paths } from "@/paths";
import { toast } from "@/core/toaster";
import SignInEmailForm from "./sign-in-email-form";
import SignInPhoneForm from "./sign-in-phone-form";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import Link from "next/link";

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
    <div className="flex flex-col items-center justify-center w-full h-full  ">
      <h1 className="text-2xl font-bold text-center">INICIAR SESION</h1>

      <div className="pt-8 space-y-4">
        {isEmailForm ? <SignInEmailForm /> : <SignInPhoneForm />}

        <div className="flex flex-row justify-center text-sm font-bold space-x-1">
          <p>¿No tienes cuenta?</p>
          <Link href="/auth/sign-up" className="text-accent hover:underline">
            Registrate
          </Link>
        </div>
        <div className="divider">ó</div>
        <div className="flex flex-col items-center w-full space-y-2">
          {isEmailForm ? (
            <button
              // add class to icon button
              className="btn btn-outline btn-accent w-full hover:!text-white"
              onClick={() => setIsEmailForm(false)}
              disabled={isPending}
            >
              <MdOutlinePhone size={20} /> Registrate con Teléfono
            </button>
          ) : (
            <button
              className="btn btn-outline btn-accent w-full hover:!text-white"
              onClick={() => setIsEmailForm(true)}
              disabled={isPending}
            >
              <MdOutlineEmail size={20} />
              Inicia sesion con Email
            </button>
          )}
          {oAuthProviders.map((provider) => (
            <button
              className="btn btn-outline btn-accent w-full   hover:!text-white"
              key={provider.id}
              onClick={() => onAuth(provider.id)}
              disabled={isPending}
            >
              {provider.logo} Inicia sesion con {provider.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
