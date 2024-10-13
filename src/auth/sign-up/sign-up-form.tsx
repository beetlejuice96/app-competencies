"use client";

import { useCallback, useState } from "react";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { Provider as ProviderSupabase } from "@supabase/supabase-js";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { AiFillDiscord } from "react-icons/ai";
import { paths } from "@/paths";
import { toast } from "@/core/toaster";
import Modal from "@/core/modal";
import SignUpEmailForm from "./sign-up-email-form";
import SignUpPhoneForm from "./sign-up-phone-form";
import ButtonAuthProvider from "../components/button-auth-provider";
interface OAuthProvider {
  id: "google" | "discord" | "email" | "phone";
  name: string;
  logo: React.ReactNode;
}

enum Provider {
  GOOGLE = "google",
  DISCORD = "discord",
  EMAIL = "email",
  PHONE = "phone",
}

const SignUpForm: React.FC = () => {
  const [supabaseClient] = useState(createSupabaseClient());
  const [isPending, setIsPending] = useState<boolean>(false);
  const [open, setOpen] = useState<{
    provider: Provider;
    open: boolean;
  }>();

  const oAuthProviders: Record<Provider, OAuthProvider> = {
    [Provider.GOOGLE]: {
      id: "google",
      name: "Google",
      logo: <FaGoogle size={20} />,
    },
    [Provider.DISCORD]: {
      id: "discord",
      name: "Discord",
      logo: <AiFillDiscord size={20} />,
    },
    [Provider.EMAIL]: {
      id: "email",
      name: "Email",
      logo: <MdOutlineEmail size={20} />,
    },
    [Provider.PHONE]: {
      id: "phone",
      name: "Phone",
      logo: <MdOutlinePhone size={20} />,
    },
  };

  const onAuth = useCallback(
    async (providerId: OAuthProvider["id"]): Promise<void> => {
      const providersAuthorized = [Provider.DISCORD, Provider.GOOGLE];
      if (providersAuthorized.includes(providerId as Provider)) {
        setIsPending(true);
        const redirectToUrl = new URL(
          paths.auth.callback.pkce,
          window.location.origin
        );
        redirectToUrl.searchParams.set("next", paths.home);

        const { data, error } = await supabaseClient.auth.signInWithOAuth({
          provider: providerId as ProviderSupabase,
          options: { redirectTo: redirectToUrl.href },
        });

        if (error) {
          setIsPending(false);
          toast.error(error.message);
          return;
        }
        window.location.href = data.url;
      }
    },
    [supabaseClient]
  );

  const openModal = ({
    provider,
    open,
  }: {
    provider: Provider;
    open: boolean;
  }) => {
    const modal = document.getElementById("modal-auth-provider");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
    setOpen({ provider, open });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      <h1 className="text-2xl font-bold text-center">Bienvenido!</h1>
      <p className="text-center text-sm ">
        Hola! necesitas registrarte para ingresar
      </p>
      <div className="pt-8 space-y-4 w-full">
        <div className="card bg-accent h-40 shadow-xl gap-1">
          <h2 className="card-title justify-center m-1">
            Registrate con Discord
          </h2>
          <figure>
            <AiFillDiscord size={60} />
          </figure>
          <div className="card-actions items-center justify-center">
            <button
              className="btn btn-white w-44"
              onClick={() => onAuth(Provider.DISCORD)}
              disabled={isPending}
            >
              Discord
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center w-full space-y-2">
          <ButtonAuthProvider
            text={`Registrate con ${oAuthProviders[Provider.GOOGLE].name}`}
            onClick={() => onAuth(Provider.GOOGLE)}
            logo={oAuthProviders[Provider.GOOGLE].logo}
          />
          <ButtonAuthProvider
            text={`Registrate con ${oAuthProviders[Provider.EMAIL].name}`}
            onClick={() =>
              openModal({
                provider: Provider.EMAIL,
                open: true,
              })
            }
            logo={oAuthProviders[Provider.EMAIL].logo}
          />
          <ButtonAuthProvider
            text={`Registrate con ${oAuthProviders[Provider.PHONE].name}`}
            onClick={() =>
              openModal({
                provider: Provider.PHONE,
                open: true,
              })
            }
            logo={oAuthProviders[Provider.PHONE].logo}
          />
        </div>

        <div className="flex flex-row justify-center text-sm font-bold space-x-1">
          <p>¿Ya tienes cuenta?</p>
          <Link href="/auth/sign-in" className="text-accent hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
      <Modal id="modal-auth-provider">
        {open && open.provider === Provider.EMAIL ? (
          <SignUpEmailForm />
        ) : open && open.provider === Provider.PHONE ? (
          <SignUpPhoneForm />
        ) : null}
      </Modal>
    </div>
  );
};

export default SignUpForm;
