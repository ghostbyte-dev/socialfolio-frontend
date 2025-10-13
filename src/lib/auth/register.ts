import { getSession, signIn } from "next-auth/react";

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id?: string;
  username?: string;
  jwt?: string;
  email?: string;
  success: boolean;
  message: string;
}

export const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data: RegisterResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    // If successful, auto-login the user
    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false, // Avoid full page reload, handle errors manually
    });

    const session = await getSession();
    if (!session?.user) {
      throw new Error("Failed to retrieve user session");
    }

    return {
      id: session.user.id,
      username: session.user.username || "",
      email: session.user.email || "",
      jwt: session.user.jwt,
      success: true,
      message: "Registering successful",
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
