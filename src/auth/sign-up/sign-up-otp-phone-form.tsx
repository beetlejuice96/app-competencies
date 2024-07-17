"use client";

import { useState } from "react";
import { z as zod } from "zod";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

//create a otp phone form

const schema = zod.object({
  phone: zod.string().min(1, { message: "Phone is required" }),
  token: zod.string().min(1, { message: "Password is required" }),
});

type Values = zod.infer<typeof schema>;

const SignUpOtpPhoneForm = () => {
  const [supabaseClient] = useState(createSupabaseClient());
  const router = useRouter();

  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Values): Promise<void> => {
    setIsPending(true);
    const { error } = await supabaseClient.auth.verifyOtp({
      phone: values.phone,
      token: values.token,
      type: "sms",
    });

    if (error) {
      console.log(error);
      setError("root", { type: "server", message: error.message });
    } else {
      //redirect to the next page
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              placeholder="Phone"
              disabled={isPending}
            />
          )}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>
      <div className="flex flex-col space-y-2">
        <Controller
          name="token"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="token"
              placeholder="token"
              disabled={isPending}
            />
          )}
        />
        {errors.token && <span>{errors.token.message}</span>}
      </div>
      <button type="submit" disabled={isPending} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default SignUpOtpPhoneForm;
