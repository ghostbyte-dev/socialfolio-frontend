
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
const getProfiles = async (cursor: string = ""): Promise<ExploreProfilesResponse> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json"
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/explore/profiles?limit=${EXPLORE_PROFILES_LIMIT}&cursor=${cursor}`, {
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