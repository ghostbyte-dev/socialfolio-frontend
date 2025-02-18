
export interface ExploreProfile {
    id: string;
}

const getNewestProfiles = async (username: string, jwt: string | undefined): Promise<ExploreProfile[]> => {
    const headers: HeadersInit = jwt ? {
        "Content-Type": "application/json"
    } : {}
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/explore", {
        headers: headers,
    }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch explore profiles");
    }

    return res.json();
};

export const ExploreService = {
    getNewestProfiles
}