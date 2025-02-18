import { getSession, signIn } from "next-auth/react";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  id?: string;
  username?: string;
  jwt?: string;
  email?: string;
  success: boolean;
  message: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    if (!result || result.error) {
      throw new Error(result?.error || "Invalid credentials");
    }

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
      message: "Login successful",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
