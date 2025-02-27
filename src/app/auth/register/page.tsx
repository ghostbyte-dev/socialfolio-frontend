"use client";

import { useState } from "react";
import { register, RegisterCredentials } from "@/lib/auth/register";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterCredentials>({
    username: "",
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

    const result = await register(formData);

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      setError(result.message);
      return;
    }
    toast.success("Registered successfully");
    router.push("/" + result.username);
  };

  return (
    <div className="w-full">
      <h1 className="text-5xl font-bold mb-5">Register</h1>

      <p className="mb-5">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline hover:text-primary">
          Log in
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col w-full">
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
  );
}
