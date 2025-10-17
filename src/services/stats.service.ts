export interface WidgetStats {
  type: string;
  mostUsedVariant?: number; // not used anymore in new version, 
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`, {
    headers: headers,
  }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch stats");
  }

  return res.json();
};

const getWidgetStats = async (): Promise<WidgetStats[]> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json"
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats/widgets`, {
    headers: headers,
  }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch stats");
  }

  return res.json();
};

export const StatsService = {
  getStats,
  getWidgetStats
}