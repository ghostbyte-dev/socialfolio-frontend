"use client";

import { useState } from "react";
import { register, RegisterCredentials } from "@/lib/auth/register";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterCredentials>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const result = await register(formData)

    if (!result.success) {
      toast.error(result.message)
      setError(result.message);
      return;
    }
    toast.success("Registered successfully")
    router.push("/dashboard"); // Redirect after successful login
  };

  return (
    <div>
      <h1 className="text-5xl font-bold mb-5">Register</h1>

<p className="mb-5">Already have an account? <Link href="/auth/login" className="underline">Log in</Link></p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded-sm"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-sm"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-sm"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-sm">
          Register
        </button>
      </form>
    </div>
  );
}
