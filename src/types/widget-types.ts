import { MastodonApiData } from "@/components/widgets/MastodonWidget";

export interface WidgetProps {
  id: string;
  type: string;
  variant: number;
  size: { cols: number; rows: number };
  data: WidgetData;
}

export interface MastodonData {
  username: string;
  instance: string;
}

export interface PixelfedData {
  username: string;
  instance: string;
}

export interface BuymeacoffeeData {
  username: string;
}

export interface TextData {
  text: string;
}

export interface GitHubData {
  username: string;
}

export interface TimezoneData {
  timezone: string;
}

export interface LiberaPayData {
  username: string;
}

export interface ImageWidgetData {
  url: string;
}

export interface NoteWidgetData {
  note: string;
}

export interface EmptyWidgetData {

}

export type WidgetData = MastodonData | GitHubData | ImageWidgetData | LiberaPayData | TextData | PixelfedData | BuymeacoffeeData | EmptyWidgetData | NoteWidgetData;
export type WidgetApiData = MastodonApiData