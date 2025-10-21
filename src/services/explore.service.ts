
export interface ExploreProfile {
  id: string;
  username: string;
  avatar: string;
  displayName: string;
  description: string;
  createdAt: Date;
}


export interface ExploreProfilesResponse {
  nextCursor: string | null;
  profiles: ExploreProfile[];
}

const EXPLORE_PROFILES_LIMIT: number = 30;
const getProfiles = async (cursor: string = "", limit: number = EXPLORE_PROFILES_LIMIT): Promise<ExploreProfilesResponse> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json"
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/explore/profiles?limit=${limit}&cursor=${cursor}`, {
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