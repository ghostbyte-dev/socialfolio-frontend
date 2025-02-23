const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const requestReset = async (email: string) => {
    const response = await fetch(API_URL + "/api/auth/password/request", {
        method: "POST",
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message);
    }
}

const resetPassword = async (password: string, token: string) => {
    const response = await fetch(API_URL + "/api/auth/password/reset", {
        method: "POST",
        body: JSON.stringify({ token, password })
    });

    if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message);
    }
}

const verify = async (token: string) => {
    const response = await fetch(API_URL + "/api/auth/verify/" + token, {
        method: "POST",
    });

    if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message);
    }
}

export const AuthService = {
    requestReset,
    resetPassword,
    verify
}