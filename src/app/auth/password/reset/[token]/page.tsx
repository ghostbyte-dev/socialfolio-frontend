"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/Button";
import { FormInput } from "@/components/inputs/FormInput";
import { AuthService } from "@/services/auth.service";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token as string;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const resetPassword = useMutation({
    mutationFn: (password: string) =>
      toast.promise(AuthService.resetPassword(password, token), {
        loading: "Resetting password...",
        success: "Password has been reset!",
        error: (err) => `Error: ${err.message}`,
      }),
    onSuccess() {
      router.push("/auth/login");
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword.mutate(data.password);
  };

  return (
    <div className="w-full">
      <title>Reset password - Socialfolio</title>
      <h1 className="text-5xl font-bold mb-5">Reset password</h1>
      <p className="mb-6">Set your new password</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col w-full"
      >
        <FormInput
          label="New Password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
        />

        <FormInput
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          label="Reset Password"
          isLoading={resetPassword.isPending}
          disabled={!isValid || resetPassword.isPending}
          className="w-full"
        />
      </form>
    </div>
  );
}
