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
import { login as loginApi } from "@/lib/auth";

// 1. Define the Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Enter a password"),
});

// 2. Extract the Type
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setToken } = useAuth();

  // 3. Initialize Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await loginApi(data.email, data.password, setToken);
      toast.success(`Welcome, ${response.username}!`);
      router.push(`/${response.username}`);
    } catch (err) {
      const msg = (err as Error).message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Login - Socialfolio</title>
      <div className="w-full">
        <h1 className="text-5xl font-bold mb-5">Login</h1>

        <p className="mb-5">
          Need an account?{" "}
          <Link href="/auth/register" className="underline hover:text-primary">
            Register
          </Link>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col w-full"
        >
          <FormInput
            label="Email"
            type="email"
            placeholder="Your email"
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
            disabled={!isValid}
            label="Login"
            isLoading={loading}
          />
        </form>

        <div className="mt-3 flex justify-center">
          <Link
            href="/auth/password/reset"
            className="underline hover:text-primary"
          >
            I forgot my password
          </Link>
        </div>
      </div>
    </>
  );
}
