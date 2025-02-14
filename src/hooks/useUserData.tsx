const REAL_API_URL = process.env.NEXT_PUBLIC_API_URL as string;


export const getUserSelf = async (token?: string) => {
  const res = await fetch(REAL_API_URL + "/api/user/self", {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
};

