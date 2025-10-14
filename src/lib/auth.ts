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

export async function login(email: string, password: string): Promise<User> {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
    }

    const user = await res.json();
    // Optionally store token in localStorage if not using cookies
    localStorage.setItem("token", user.jwt);
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
    localStorage.removeItem("token");
}

export function getToken(): string | null {
    return localStorage.getItem("token");
}
