"use client";

import { useCallback, useState } from "react";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { paths } from "@/paths";
import { toast } from "@/core/toaster";
import Image from "next/image";
import SignUpEmailForm from "./sign-up-email-form";
import SignUpPhoneForm from "./sign-up-phone-form";
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

const SignUpForm: React.FC = () => {
  const [supabaseClient] = useState(createSupabaseClient());
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

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 bg-gray-100">
      {isEmailForm ? <SignUpEmailForm /> : <SignUpPhoneForm />}
      <div className="flex items-center" style={{ maxWidth: "24rem" }}>
        {isEmailForm ? (
          <button
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
            {/* <Image
              className="rounded-full"
              src={provider.logo}
              alt={provider.name}
              width={24}
              height={24}
            />
            Sign up with {provider.name} */}
            {provider.logo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SignUpForm;
