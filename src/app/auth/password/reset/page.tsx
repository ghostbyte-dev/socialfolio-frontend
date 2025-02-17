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
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Send reset link
        </button>
      </form>
      {requestPasswordReset.isPending ? <p>Loading...</p> : <></>}
    </div>
  );
}
