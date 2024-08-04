"use client";

import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { z as zod } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "@/paths";
// import { paths } from "@/paths";

const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod.string().min(1, { message: "Password is required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: "", password: "" } satisfies Values;

const SignInEmailForm = () => {
  const [supabaseClient] = useState<SupabaseClient>(createSupabaseClient());

  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await supabaseClient.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.log(error);
        if (error.message.includes("Email not confirmed")) {
          // You should resend the verification email.
          // For the sake of simplicity, we will just redirect to the confirmation page.
          const searchParams = new URLSearchParams({ email: values.email });
          // console.log(searchParams.toString());
          router.push(`${paths.auth.signUpConfirm}?${searchParams.toString()}`);
        } else {
          setError("root", { type: "server", message: error.message });
          setIsPending(false);
        }
      } else {
        // UserProvider will handle Router refresh
        // After refresh, GuestGuard will handle the redirect
      }
    },
    [supabaseClient, router, setError]
  );

  return (
    <>
      <h1 className="text-2xl font-bold text-center" style={{ color: "black" }}>
        Sign in with Email
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="input w-full max-w-xs"
                placeholder="Email"
                disabled={isPending}
              />
            )}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="flex flex-col space-y-2">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="input w-full max-w-xs"
                placeholder="Password"
                disabled={isPending}
              />
            )}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit" disabled={isPending}>
          Sign in
        </button>
      </form>
    </>
  );
};

export default SignInEmailForm;
