import { FC, useCallback, useState } from "react";
import { z as zod } from "zod";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { paths } from "@/paths";

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
      redirectToUrl.searchParams.set("next", paths.platform.start);

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

  return (
    <>
      <h1 className="text-2xl font-bold text-center" style={{ color: "black" }}>
        Sign up with email
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
        <button type="submit" disabled={isPending} className="btn ">
          {isPending ? "Signing up..." : "Sign up"}
        </button>
        {errors.root && <span>{errors.root.message}</span>}
      </form>
    </>
  );
};

export default SignUpEmailForm;
