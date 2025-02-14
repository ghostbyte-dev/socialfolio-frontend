"use client";

import Bio from "@/components/Bio";
import UserNotFoundPage from "@/components/UserNotFoundPage";
import WidgetsGrid from "@/components/WidgetsGrid";
import { UserService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function UserPage() {
  const params = useParams();
  const username = params.username as string;

  const { data: session } = useSession();
  const loggedInUsername = session?.user?.username;

  const isOwner = username === loggedInUsername;

  const [userNotFound, setUserNotFound] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["otheruser", username],
    queryFn: async () => {
      try {
        return await UserService.getUser(username);
      } catch (err: any) {
        if (err.message === "UserNotFound") {
          setUserNotFound(true);
          throw err; // Still set error so React Query knows
        }
        throw err;
      }
    },
    enabled: !!username,
    retry: (failureCount, error) => {
      if (error.message === "UserNotFound") return false; // Don't retry on 404
      return failureCount < 3; // Retry other errors up to 3 times
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (error && userNotFound) return <UserNotFoundPage/>;

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
