"use client";

import WidgetsGrid from "@/components/WidgetsGrid";
import { sampleWidgets } from "@/data/sampleData";
import { getUserData } from "@/hooks/useUserData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function UserPage() {
  const params = useParams();
  const username = params.username as string;

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["otheruser", username],
    queryFn: () => getUserData(username),
    enabled: !!username,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-4xl w-4/5 mx-auto flex flex-col items-center my-20">
      <section className="mb-10">
        <h1 className="text-5xl font-bold mb-4">
          {user.displayName && user.displayName}

          {!user.displayName && user.username}
        </h1>
        <p className="text-xl">{user.description}</p>
      </section>

      <section className="w-full">
        <WidgetsGrid widgets={sampleWidgets} />
      </section>
    </div>
  );
}
