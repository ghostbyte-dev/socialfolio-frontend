import type { MetadataRoute } from "next/types";
import {
    type ExploreProfile,
    ExploreService,
} from "@/services/explore.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let index = 0;
    let cursor: string | null = "";
    const profiles: ExploreProfile[] = [];
    while (index < 20 && cursor !== null) {
        const res = await ExploreService.getProfiles(cursor, 100);
        profiles.push(...res.profiles);
        cursor = res.nextCursor;
        index++;
    }

    const userPages: MetadataRoute.Sitemap = profiles.map(
        (profile: ExploreProfile) => ({
            url: `https://socialfolio.me/${profile.username}`,
            changeFrequency: "weekly",
            priority: 0.2,
            lastModified: new Date(),
        }),
    );

    return [
        {
            url: "https://socialfolio.me",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://socialfolio.me/explore",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: "https://socialfolio.me/imprint",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.1,
        },
        ...userPages,
    ];
}
