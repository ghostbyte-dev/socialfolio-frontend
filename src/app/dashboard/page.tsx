"use client";

import { useUserData } from "@/hooks/useUserData";

export default function DashboardPage() {

  const { user, isLoading, error } = useUserData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Welcome, <strong>{user?.username}</strong>!</p>
    </div>
  );
}
