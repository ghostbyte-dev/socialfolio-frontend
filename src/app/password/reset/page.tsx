"use client"

import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function RequestPasswordReset () {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState<string | null>(null);

  const requestPasswordReset = useMutation({
    mutationFn: (email: string) => AuthService.requestReset(email),
    onError: (error: Error) => {
      setError(error.message);
    },
    onSuccess(data, variables, context) {
      console.log("success");
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          Login
        </button>
      </form>
      {requestPasswordReset.isPending ? <p>Loading...</p>: <></>}
    </div>
  );
}
