import { signIn } from "next-auth/react";

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
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
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false, // Avoid full page reload, handle errors manually
    });

    return { success: true, message: "Registration successful" };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
