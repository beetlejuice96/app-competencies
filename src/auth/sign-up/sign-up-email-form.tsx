import { FC, useCallback, useState } from "react";
import { z as zod } from "zod";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { paths } from "@/paths";
import { BiLoader } from "react-icons/bi";
import { off } from "process";

//TODO: hacer que repita la contrasenia
const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  email: "",
  password: "",
} satisfies Values;

const SignUpEmailForm: FC = () => {
  const [supabaseClient] = useState(createSupabaseClient());
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

      // It is really important that you read the official notes
      // under "If signUp() is called for an existing confirmed user"
      // https://supabase.com/docs/reference/javascript/auth-signup
      // If a user already exists with this email, they will not
      // receive a confirmation email.

      const redirectToUrl = new URL(
        paths.auth.callback.pkce,
        window.location.origin
      );
      redirectToUrl.searchParams.set("next", paths.home);

      const { data, error } = await supabaseClient.auth.signUp({
        email: values.email,
        password: values.password,
        options: { emailRedirectTo: redirectToUrl.href },
      });

      if (error) {
        setError("root", { type: "server", message: error.message });
        setIsPending(false);
        return;
      }

      if (data.session) {
        // UserProvider will handle Router refresh
        // After refresh, GuestGuard will handle the redirect
        return;
      }

      if (data.user) {
        const searchParams = new URLSearchParams({ email: values.email });
        router.push(`${paths.auth.signUpConfirm}?${searchParams.toString()}`);
        return;
      }

      setIsPending(false);
    },
    [supabaseClient, router, setError]
  );
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-primary">
        <span className="loading loading-dots loading-lg" />
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col">
          <div className="label pb-1">
            <span className="label-text">Email</span>
          </div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="input w-full border-secondary bg-opacity-20 bg-primary"
                placeholder="Email"
                disabled={isPending}
              />
            )}
          />
          {errors.email && <span className="pt-2">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col ">
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
                className="input w-full border-secondary bg-opacity-20 bg-primary"
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
          Continuar
        </button>
      </form>
    </>
  );
};

export default SignUpEmailForm;
