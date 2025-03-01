import { IUser, Status } from "@/types/user-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const getSelf = async (jwt: string): Promise<IUser> => {
    const headers: HeadersInit = jwt ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
    } : {}
    const res = await fetch(API_URL + "/api/user/self", { headers: headers });
    if (!res.ok) {
        throw new Error("Failed to fetch user data");
    }

    return res.json();
};


const getUser = async (username: string, jwt: string | undefined): Promise<IUser> => {
    const headers: HeadersInit = jwt ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
    } : {}
    const res = await fetch(API_URL + "/api/user/username/" + username, { headers: headers });
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

const updateStatus = async (
    status: Status,
    jwt: string
): Promise<IUser> => {
    const response = await fetch(API_URL + "/api/user/update/status", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ status: status })
    });

    if (!response.ok) throw new Error("Failed to update description");

    return response.json();
};

const uploadAvatar = async (
    avatar: Blob,
    jwt: string
): Promise<IUser> => {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await fetch(API_URL + "/api/user/uploadAvatar", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        body: formData,
    });
    if (!response.ok) throw new Error("Failed to update description");

    return response.json();
}

export const UserService = {
    getSelf,
    getUser,
    updateDisplayName,
    updateDescription,
    updateStatus,
    uploadAvatar
};