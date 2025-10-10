"use client";

import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token as string;
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const resetPassword = useMutation({
    mutationFn: (password: string) =>
      toast.promise(AuthService.resetPassword(password, token), {
        loading: "Resetting password...",
        success: "Password has been reset!",
        error: (err) => `Error: ${err.message}`,
      }),
    onError: (error: Error) => {
      setError(error.message);
    },
    onSuccess() {
      router.push("/auth/login");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password == formData.repeatPassword) {
      resetPassword.mutate(formData.password);
    }
  };

  return (
    <>
      <title>Reset password - Socialfolio</title>
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col w-full"
        >
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="password"
            name="repeatPassword"
            placeholder="Password"
            value={formData.repeatPassword}
            onChange={handleChange}
            className="input"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            disabled={formData.password != formData.repeatPassword}
            type="submit"
            className="button w-full"
          >
            Reset
          </button>
        </form>
        {resetPassword.isPending ? <p>Loading...</p> : <></>}
      </div>
    </>
  );
}
