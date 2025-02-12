import { WidgetProps, MastodonData, GitHubData } from "@/types/widget-types";

export const sampleWidgets: WidgetProps[] = [
    {
        id: "1",
        type: "mastodon",
        size: { cols: 2, rows: 1 },
        data: { username: "@user@masto.social" } as MastodonData,
    },
    {
        id: "2",
        type: "github",
        size: { cols: 1, rows: 1 },
        data: { repo: "octocat/hello-world" } as GitHubData,
    },
    {
        id: "3",
        type: "mastodon",
        size: { cols: 3, rows: 2 },
        data: { username: "@developer@fosstodon.org" } as MastodonData,
    },
    {
        id: "4",
        type: "github",
        size: { cols: 2, rows: 1 },
        data: { repo: "torvalds/linux" } as GitHubData,
    },
];