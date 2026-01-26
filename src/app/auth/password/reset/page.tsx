"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/Button";
import { FormInput } from "@/components/inputs/FormInput";
import { AuthService } from "@/services/auth.service";

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ResetFormData = z.infer<typeof resetSchema>;

export default function RequestPasswordReset() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const requestPasswordReset = useMutation({
    mutationFn: (email: string) =>
      toast.promise(AuthService.requestReset(email), {
        loading: "Sending reset link...",
        success: "Reset link sent to your email",
        error: (err) => `Error: ${err.message}`,
      }),
  });

  const onSubmit = (data: ResetFormData) => {
    requestPasswordReset.mutate(data.email);
  };

  return (
    <div className="w-full">
      <title>Reset password - Socialfolio</title>
      <h1 className="text-3xl font-bold mb-5">Reset Password</h1>
      <p className="mb-6">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col w-full"
      >
        <FormInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          label="Send reset link"
          isLoading={requestPasswordReset.isPending}
          disabled={!isValid || requestPasswordReset.isPending}
        />
      </form>
    </div>
  );
}
