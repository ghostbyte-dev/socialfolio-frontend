"use client";

import Bio from "@/components/Bio";
import WidgetsGrid from "@/components/WidgetsGrid";
import { getUserData } from "@/hooks/useUserData";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function UserPage() {
  const params = useParams();
  const username = params.username as string;

  const { data: session } = useSession();
  const loggedInUsername = session?.user?.username;

  const isOwner = username === loggedInUsername;

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
    <div className="max-w-7xl w-4/5 mx-auto flex flex-col items-center my-20">
      <section className="mb-16">
        <Bio isOwner={isOwner} user={user} />
      </section>

      <section className="w-full">
        <WidgetsGrid username={username} isOwner={isOwner} />
      </section>
    </div>
  );
}
