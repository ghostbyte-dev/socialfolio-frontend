
export interface ExploreProfile {
    id: string;
    username: string;
    avatar: string;
    displayName: string;
    description: string;
    createdAt: Date;
}

const getProfiles = async (): Promise<ExploreProfile[]> => {
    const headers: HeadersInit = {
        "Content-Type": "application/json"
    }
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/explore/profiles", {
        headers: headers,
    }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch explore profiles");
    }

    return res.json();
};

export const ExploreService = {
    getProfiles
}