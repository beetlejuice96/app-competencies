"use client";
import { z as zod } from "zod";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = zod.object({
  phone: zod.string().min(1, { message: "Phone is required" }),
  password: zod.string().min(1, { message: "Password is required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { phone: "", password: "" } satisfies Values;

const SignInPhoneForm = () => {
  const [supabaseClient] = useState<SupabaseClient>(createSupabaseClient());
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

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
        phone: values.phone,
        password: values.password,
      });

      if (error) {
        console.log(error);
        if (error.message.includes("Email not confirmed")) {
          // You should resend the verification email.
          // For the sake of simplicity, we will just redirect to the confirmation page.
          const searchParams = new URLSearchParams({ phone: values.phone });
          console.log(searchParams.toString());
          //   router.push(
          //     `${paths.auth.signUpConfirm}?${searchParams.toString()}`
          //   );
        } else {
          setError("root", { type: "server", message: error.message });
          setIsPending(false);
        }
      } else {
        // UserProvider will handle Router refresh
        // After refresh, GuestGuard will handle the redirect
      }
    },
    [supabaseClient, setError]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col">
          <div className="label pb-1">
            <span className="label-text">Teléfono</span>
          </div>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="tel"
                className="input w-full max-w-xs border-secondary bg-opacity-20 bg-primary"
                placeholder="Phone"
                autoComplete="off"
                disabled={isPending}
              />
            )}
          />
          {errors.phone && <span className="pt-2">{errors.phone.message}</span>}
        </div>
        <div className="flex flex-col">
          <div className="label pb-1">
            <span className="label-text">Contraseña</span>
          </div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="input w-full max-w-xs border-secondary bg-opacity-20 bg-primary"
                autoComplete="off"
                placeholder="Password"
                disabled={isPending}
              />
            )}
          />
          {errors.password && (
            <span className="pt-2">{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-accent text-white shadow-[0px_0px_30px_rgba(123,44,191,0.8)] hover:shadow-[0px_0px_30px_rgba(123,44,191,0.8)]"
        >
          Iniciar sesión
        </button>
      </form>
    </>
  );
};

export default SignInPhoneForm;
