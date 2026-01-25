"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/Button";
import { FormInput } from "@/components/inputs/FormInput";
import { useAuth } from "@/context/AuthContext";
import { login, registerUser } from "@/lib/auth";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setToken } = useAuth();

  // 2. Initialize Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      // Create account
      await registerUser(data.username, data.email, data.password);
      toast.success("Registered successfully");

      // Auto-login
      const user = await login(data.email, data.password, setToken);
      toast.success(`Welcome, ${user.username}!`);
      router.push(`/${user.username}`);
    } catch (err) {
      toast.error((err as Error).message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Register - Socialfolio</title>
      <div className="w-full">
        <h1 className="text-5xl font-bold mb-5">Register</h1>

        <p className="mb-5">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline hover:text-primary">
            Log in
          </Link>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col w-full"
        >
          <FormInput
            label="Username"
            placeholder="johndoe"
            {...register("username")}
            error={errors.username?.message}
          />

          <FormInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            label="Register"
            isLoading={loading}
            disabled={!isValid || loading}
          />
        </form>
      </div>
    </>
  );
}
