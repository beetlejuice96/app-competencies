"use client";

import { useCallback, useState } from "react";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { paths } from "@/paths";
import { toast } from "@/core/toaster";
import Image from "next/image";
import SignUpEmailForm from "./sign-up-email-form";

interface OAuthProvider {
  id: "google";
  name: string;
  logo: string;
}

const oAuthProviders = [
  { id: "google", name: "Google", logo: "/assets/logo-google.svg" },
] satisfies OAuthProvider[];

const SignUpForm: React.FC = () => {
  const [supabaseClient] = useState(createSupabaseClient());
  const [isPending, setIsPending] = useState<boolean>(false);

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
      <h1 className="text-2xl font-bold text-center" style={{ color: "black" }}>
        Sign up
      </h1>
      <SignUpEmailForm />
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
            Sign up with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SignUpForm;
