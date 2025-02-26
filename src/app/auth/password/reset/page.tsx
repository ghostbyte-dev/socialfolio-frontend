"use client";

import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RequestPasswordReset() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState<string | null>(null);

  const requestPasswordReset = useMutation({
    mutationFn: (email: string) =>
      toast.promise(
        AuthService.requestReset(email),
        {
          loading: "Sending reset link...",
          success: "Reset link got sent to you",
          error: (err) => `Error: ${err.message}`,
        }
      ),
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestPasswordReset.mutate(formData.email);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col w-full">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="button w-full"
        >
          Send reset link
        </button>
      </form>
      {requestPasswordReset.isPending ? <p>Loading...</p> : <></>}
    </div>
  );
}
