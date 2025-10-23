"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Bio from "@/components/Bio";
import ErrorPage from "@/components/ErrorPage";
import LoadingIndicator from "@/components/LoadingIndicator";
import UserNotFoundPage from "@/components/UserNotFoundPage";
import WidgetsGrid from "@/components/WidgetsGrid";
import { useAuth } from "@/context/AuthContext";
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { Status } from "@/types/user-type";

export default function UserPage() {
  const params = useParams();
  const username = params.username as string;

  const { token, user: authUser } = useAuth();
  const loggedInUsername = authUser?.username;

  const isOwner = username === loggedInUsername;

  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    document.title = `${username} - Socialfolio`;
  }, [username]);

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["otheruser", username],
    queryFn: async () => {
      try {
        console.log(token);
        return await UserService.getUser(username, token ?? "");
      } catch (err: any) {
        if (err.message === "UserNotFound") {
          setUserNotFound(true);
          throw err;
        }
        throw err;
      }
    },
    enabled: !!username,
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
      {isOwner && user.status === Status.Unverified && (
        <div className="w-full h-10 bg-red-500 flex justify-center items-center">
          <span className="text-white font-bold">
            Your profile is not visible until you verify your email
          </span>

          <button
            type="button"
            className="bg-black text-sm text-white px-3 py-1 rounded-lg ml-3"
            onClick={() => {
              resendVerificationCode.mutate(token ?? "");
            }}
          >
            Resend Verification Email
          </button>
        </div>
      )}
      <div className=" flex flex-col items-center my-20 content-wrapper">
        <section className="mb-16 w-full">
          <Bio isOwner={isOwner} user={user} />
        </section>

        <section className="w-full">
          <WidgetsGrid username={username} isOwner={isOwner} />
        </section>
      </div>
    </>
  );
}
