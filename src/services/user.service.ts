import { IUser } from "@/types/user-type";


const updateDisplayName = async (
    displayname: string,
    jwt: string
): Promise<IUser> => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user/update/displayname", {
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

export const UserService = {
    updateDisplayName
};