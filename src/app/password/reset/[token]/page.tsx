"use client";

import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token as string;

  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const resetPassword = useMutation({
    mutationFn: (password: string) =>
      AuthService.resetPassword(password, token),
    onError: (error: Error) => {
      toast.error(error.message);
      setError(error.message);
    },
    onSuccess(data, variables, context) {
      console.log("success");
      toast.success("Password got resetted")
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="repeatPassword"
          placeholder="Password"
          value={formData.repeatPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          disabled={formData.password != formData.repeatPassword}
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Reset
        </button>
      </form>
      {resetPassword.isPending ? <p>Loading...</p> : <></>}
    </div>
  );
}
