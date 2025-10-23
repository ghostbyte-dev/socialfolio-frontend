"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "@/components/SubmitButton";
import { useAuth } from "@/context/AuthContext";
import { login, registerUser } from "@/lib/auth";
import type { RegisterCredentials } from "@/services/auth.service";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterCredentials>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setToken } = useAuth(); // 👈 new auth context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await registerUser(formData.username, formData.email, formData.password);
      toast.success("Registered successfully");

      // Auto-login after registration
      const user = await login(formData.email, formData.password, setToken);
      toast.success(`Welcome, ${user.username}!`);
      router.push(`/${user.username}`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Register - Socialfolio</title>
      <div className="w-full">
        <h1 className="text-5xl font-bold mb-5 cursive-font">Register</h1>

        <p className="mb-5">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline hover:text-primary">
            Log in
          </Link>
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col w-full"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="input"
            required
          />
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
          <SubmitButton text="Register" isLoading={loading} />
        </form>
      </div>
    </>
  );
}
