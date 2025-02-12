export interface WidgetProps {
  id: string;
  type: string;
  size: { cols: number; rows: number };
  data: WidgetData;
}

export interface MastodonData {
  username: string;
}

export interface GitHubData {
  repo: string;
}

export type WidgetData = MastodonData | GitHubData;