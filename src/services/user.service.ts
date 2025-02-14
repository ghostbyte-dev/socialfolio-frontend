import { IUser } from "@/types/user-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;


const getUser = async (username: string) => {
    const res = await fetch(API_URL + "/api/user/username/" + username);

    if (!res.ok) {
        if (res.status === 404) {
            throw new Error("UserNotFound");
        }
        throw new Error("Failed to fetch user data");
    }

    return res.json();
};

const updateDisplayName = async (
    displayname: string,
    jwt: string
): Promise<IUser> => {
    const response = await fetch(API_URL + "/api/user/update/displayname", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ displayname: displayname })
    });

    if (!response.ok) throw new Error("Failed to delete widget");

    return response.json();
};

const updateDescription = async (
    description: string,
    jwt: string
): Promise<IUser> => {
    const response = await fetch(API_URL + "/api/user/update/description", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ description: description })
    });

    if (!response.ok) throw new Error("Failed to update description");

    return response.json();
};

export const UserService = {
    getUser,
    updateDisplayName,
    updateDescription
};