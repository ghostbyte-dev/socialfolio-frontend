import { WidgetProps, MastodonData, GitHubData, ImageWidgetData } from "@/types/widget-types";

export const sampleWidgets: WidgetProps[] = [
    {
        id: "1",
        type: "mastodon",
        variant: 1,
        size: { cols: 1, rows: 1 },
        data: { username: "daniebeler", instance: "techhub.social" } as MastodonData,
    },
    {
        id: "2",
        type: "github",
        variant: 1,
        size: { cols: 2, rows: 1 },
        data: { username: "daniebeler" } as GitHubData,
    },
    {
        id: "3",
        type: "image",
        variant: 1,
        size: { cols: 2, rows: 2 },
        data: { url: "https://daniebeler.com/img/profilbild.webp" } as ImageWidgetData,
    },
    {
        id: "4",
        type: "github",
        variant: 2,
        size: { cols: 1, rows: 2 },
        data: { username: "Hiebeler" } as GitHubData,
    },
    {
        id: "5",
        type: "mastodon",
        variant: 2,
        size: { cols: 3, rows: 1 },
        data: {
            username: "daniebeler",
            instance: "techhub.social",
            avatar: "https://daniebeler.com/img/profilbild.webp",
            displayName: "Daniel Hiebeler",
            description: "I am studying in Vienna",
            followersCount: 2232
        } as MastodonData,
    },
];