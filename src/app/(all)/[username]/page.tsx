"use client";

import Bio from "@/components/Bio";
import ErrorPage from "@/components/ErrorPage";
import LoadingIndicator from "@/components/LoadingIndicator";
import UserNotFoundPage from "@/components/UserNotFoundPage";
import WidgetsGrid from "@/components/WidgetsGrid";
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { Status } from "@/types/user-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserPage() {
  const params = useParams();
  const username = params.username as string;

  const { data: session, status } = useSession();
  const sessionStatus = status ?? "loading";
  const loggedInUsername = session?.user?.username;

  const isOwner = username === loggedInUsername;

  const [userNotFound, setUserNotFound] = useState(false);
  const jwt = session?.user?.jwt;

  useEffect(() => {
    document.title = username + " - Socialfolio";
  }, [username]);

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["otheruser", username],
    queryFn: async () => {
      try {
        return await UserService.getUser(username, jwt);
      } catch (err: any) {
        if (err.message === "UserNotFound") {
          setUserNotFound(true);
          throw err;
        }
        throw err;
      }
    },
    enabled: !!username && sessionStatus !== "loading",
  });

  const resendVerificationCode = useMutation({
    mutationFn: (jwt: string) =>
      toast.promise(AuthService.resendVerificationCode(jwt), {
        loading: "Sending verification Email...",
        success: "Verification Email has been sent!",
        error: (err) => `Error: ${err.message}`,
      }),
  });

  if (isPending) return <LoadingIndicator />;

  if (error && userNotFound) return <UserNotFoundPage />;

  if (error) return <ErrorPage message={error.message} />;

  return (
    <>
      {isOwner && user.status == Status.Unverified && (
        <div className="w-full h-10 bg-red-500 flex justify-center items-center">
          <span className="text-white font-bold">
            Your profile is not visible until you verify your email
          </span>

          <button
            className="bg-black text-sm text-white px-3 py-1 rounded-lg ml-3"
            onClick={() => {
              resendVerificationCode.mutate(jwt!);
            }}
          >
            Resend Verification Email
          </button>
        </div>
      )}
      <div className="max-w-7xl w-4/5 mx-auto flex flex-col items-center my-20">
        <section className="mb-16">
          <Bio isOwner={isOwner} user={user} />
        </section>

        <section className="w-full">
          <WidgetsGrid username={username} isOwner={isOwner} />
        </section>
      </div>
    </>
  );
}
