import useSWR from "swr";
import { useSession } from "next-auth/react";

export const fetcher = async (url: string, token?: string) => {
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

export const useUserData = async () => {
  return fetcher("/api/user/self", "token");
};
