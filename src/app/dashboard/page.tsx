"use client";

import { getUserSelf } from "@/hooks/useUserData";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const jwt = session?.user?.jwt;
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", jwt],
    queryFn: () => getUserSelf(jwt),
    enabled: !!jwt,
  });
  
  if (status === "loading") return <p>Loading session...</p>;
  if (!session) return <p>No session found</p>;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Welcome, <strong>{user?.username}</strong>!</p>
    </div>
  );
}
