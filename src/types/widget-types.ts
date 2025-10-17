import type { MastodonApiData, WeatherApiData } from "@/components/widgets/MastodonWidget";

export interface WidgetProps {
  id: string;
  type: string;
  variant: number;
  size: WidgetSize;
  data: WidgetData;
  priority?: number;
}

export interface WidgetSize {
  cols: number;
  rows: number;
}

export interface MastodonData {
  username: string;
  instance: string;
}

export interface PixelfedData {
  username: string;
  instance: string;
}

export interface BookWyrmWidgetData {
  username: string;
  instance: string;
}

export interface PeertubeData {
  username: string;
  instance: string;
}

export interface NeoDBData {
  username: string;
  instance: string;
}

export interface GlassPhotoData {
  username: string;
}

export interface BlueskyData {
  handle: string;
}

export interface MatrixData {
  username: string;
  instance: string;
}

export interface FediverseData {
  link: string;
  fediverseHandle: string;
}

export interface LemmyWidgetData {
  username: string;
  instance: string;
}

export interface BuymeacoffeeData {
  username: string;
}

export interface VernissageData {
  username: string;
}

export interface LocationWidgetData {
  lon: string;
  lat: string;
  zoom: number;
}

export interface WeatherWidgetData {
  lon: string;
  lat: string;
}

export interface TextData {
  text: string;
}

export interface GitHubData {
  username: string;
}

export interface CodebergData {
  username: string;
}

export interface TimezoneData {
  timezone: string;
}

export interface LiberaPayData {
  username: string;
}

export interface RecordClubData {
  username: string;
}

export interface ListenBrainzData {
  username: string;
}

export interface KofiData {
  username: string;
}

export interface ImageWidgetData {
  image: string;
  link: string | undefined;
}

export interface NoteWidgetData {
  note: string;
}

export interface CountryWidgetData {
  countryName: string;
}

export interface EmailData {
  email: string;
}

export interface LinkData {
  link: string;
  label: string | undefined;
}

export interface GithubApiData {
  username: string;
  name: string;
  avatar: string;
  url: string;
  location: string;
  followers: number;
  following: number;
  publicRepos: number;
  contributions: ContributionsCollection;
}

export interface ContributionsCollection {
  colors: string[];
  totalContributions: number;
  weeks: ContributionsWeek[];
}

export interface ContributionsWeek {
  contributionDays: ContributionDay[];
  firstDay: string;
}

export interface ContributionDay {
  color: string;
  contributionCount: number;
  date: string;
  weekday: number;
}

export type WidgetData =
  {}
  | MastodonData
  | GitHubData
  | ImageWidgetData
  | LiberaPayData
  | TextData
  | PixelfedData
  | BuymeacoffeeData
  | NoteWidgetData
  | EmailData
  | CodebergData
  | MatrixData
  | LinkData
  | PeertubeData
  | LocationWidgetData;
export type WidgetApiData = MastodonApiData | GithubApiData | WeatherApiData;
