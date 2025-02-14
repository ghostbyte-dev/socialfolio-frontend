"use client";

import Avatar from "@/components/Avatar";
import Description from "@/components/Description";
import DisplayName from "@/components/DisplayName";
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
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="mr-5">
            <Avatar url="" isOwner={isOwner} />
          </div>

          <div className="flex flex-col items-start justify-center">
            <DisplayName
              name={user.displayName?.trim() ? user.displayName : user.username}
              isOwner={isOwner}
            />

            <Description description={user.description} isOwner={isOwner} />
          </div>
        </div>
      </section>

      <section className="w-full">
        <WidgetsGrid username={username} isOwner={isOwner} />
      </section>
    </div>
  );
}
