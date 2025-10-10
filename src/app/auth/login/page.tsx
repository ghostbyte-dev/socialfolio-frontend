"use client";

import { useState } from "react";
import { login, type LoginCredentials } from "@/lib/auth/login";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import SubmitButton from "@/components/SubmitButton";

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    setLoading(true);

    const result = await login(formData);

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      setError(result.message);
      return;
    }
    toast.success("Logged in");
    router.push(`/${result.username}`);
  };

  return (
    <>
      <title>Login - Socialfolio</title>
      <div className="w-full">
        <h1 className="text-5xl font-bold mb-5">Login</h1>

        <p className="mb-5">
          Need an account yet?{" "}
          <Link href="/auth/register" className="underline hover:text-primary">
            Register
          </Link>
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col w-full"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
          {error && <p className="text-red-500">{error}</p>}

          <SubmitButton text="Login" isLoading={loading} />
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
