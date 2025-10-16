import type { User as AuthContextUser } from "@/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export interface User {
    id: string;
    username: string;
    email: string;
    jwt: string;
}

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

export async function login(email: string, password: string, setToken: (token: string | null, userData?: AuthContextUser | null) => void): Promise<User> {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const err = await res.json();
        console.error(err.message);
        throw new Error(err.message || "Login failed");
    }

    const user = await res.json();

    setToken(user.jwt, {
        id: user.id,
        username: user.username,
        email: user.email,
    });

    return user;
}

export async function registerUser(username: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data;
}

export function logout() {
    localStorage.removeItem("jwt");
}

export function getToken(): string | null {
    return localStorage.getItem("jwt");
}
