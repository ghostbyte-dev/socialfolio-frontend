export interface WidgetStats {
    type: string;
    mostUsedVariant: number;
    count: number;
}

export interface StatsResponse {
    userCount: number;
    widgetCount: number;
    mostUsedWidgets: WidgetStats[];
}

const getStats = async (): Promise<StatsResponse> => {
    const headers: HeadersInit = {
        "Content-Type": "application/json"
    }
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/stats", {
        headers: headers,
    }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch stats");
    }

    return res.json();
};

export const StatsService = {
    getStats
}