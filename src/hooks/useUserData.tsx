import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcher = async (url: string, token?: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
};

export const useUserData = () => {
  const { data: session } = useSession();

  console.log(session)

  const { data, error, isLoading } = useSWR(
    session?.user.jwt ? ["/api/user/self", session.user.jwt] : null,
    ([url, token]) => fetcher(url, token)
  );

  console.log(data)

  return {
    user: data,
    isLoading,
    error,
  };
};
