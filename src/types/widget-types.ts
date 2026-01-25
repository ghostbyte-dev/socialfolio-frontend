// /types/widget-types.ts
import { z } from "zod";
import type {
  MastodonApiData,
  WeatherApiData,
} from "@/components/widgets/MastodonWidget";

/**
 * Core widget props (kept as explicit TS interfaces since they are used in many places)
 */
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

/* ---------------------------
   Zod schemas + inferred types
   --------------------------- */

/* Mastodon (example: accept string for instance to allow domain or url) */
export const MastodonSchema = z.object({
  username: z.string().min(1, "Username is required"),
  instance: z.string().min(1, "Instance is required"),
});
export type MastodonData = z.infer<typeof MastodonSchema>;

/* Pixelfed */
export const PixelfedSchema = z.object({
  username: z.string().min(1),
  instance: z.string().min(1),
});
export type PixelfedData = z.infer<typeof PixelfedSchema>;

/* Loops */
export const LoopsSchema = z.object({
  username: z.string().min(1),
  instance: z.string().min(1),
});
export type LoopsData = z.infer<typeof LoopsSchema>;

/* BookWyrm */
export const BookWyrmSchema = z.object({
  username: z.string().min(1),
  instance: z.string().min(1),
});
export type BookWyrmWidgetData = z.infer<typeof BookWyrmSchema>;

/* Peertube */
export const PeertubeSchema = z.object({
  username: z.string().min(1),
  instance: z.string().min(1),
});
export type PeertubeData = z.infer<typeof PeertubeSchema>;

/* NeoDB */
export const NeoDBSchema = z.object({
  username: z.string().min(1),
  instance: z.string().min(1),
});
export type NeoDBData = z.infer<typeof NeoDBSchema>;

/* Glass (Glass.photo) */
export const GlassPhotoSchema = z.object({
  username: z.string().min(1),
});
export type GlassPhotoData = z.infer<typeof GlassPhotoSchema>;

/* Bluesky */
export const BlueskySchema = z.object({
  handle: z.string().min(1),
});
export type BlueskyData = z.infer<typeof BlueskySchema>;

/* Instagram */
export const InstagramSchema = z.object({
  username: z.string().min(1),
});
export type InstagramData = z.infer<typeof InstagramSchema>;

/* Threads */
export const ThreadsSchema = z.object({
  username: z.string().min(1),
});
export type ThreadsData = z.infer<typeof ThreadsSchema>;

/* Strava */
export const StravaSchema = z.object({
  username: z.string().min(1),
});
export type StravaData = z.infer<typeof StravaSchema>;

/* Linkedin */
export const LinkedinSchema = z.object({
  username: z.string().min(1),
});
export type LinkedinData = z.infer<typeof LinkedinSchema>;

/* Facebook */
export const FacebookSchema = z.object({
  username: z.string().min(1),
});
export type FacebookData = z.infer<typeof FacebookSchema>;

/* X (Twitter) */
export const XSchema = z.object({
  username: z.string().min(1),
});
export type XData = z.infer<typeof XSchema>;

/* Pinterest */
export const PinterestSchema = z.object({
  username: z.string().min(1),
});
export type PinterestData = z.infer<typeof PinterestSchema>;

/* YouTube (handle) */
export const YoutubeSchema = z.object({
  handle: z.string().min(1),
});
export type YoutubeData = z.infer<typeof YoutubeSchema>;

/* Telegram */
export const TelegramSchema = z.object({
  username: z.string().min(1),
});
export type TelegramData = z.infer<typeof TelegramSchema>;

/* SocialFolio */
export const SocialfolioSchema = z.object({
  username: z.string().min(1),
});
export type SocialfolioData = z.infer<typeof SocialfolioSchema>;

/* GitLab */
export const GitlabSchema = z.object({
  instance: z.string().min(1),
  username: z.string().min(1),
});
export type GitlabData = z.infer<typeof GitlabSchema>;

/* Reddit */
export const RedditSchema = z.object({
  username: z.string().min(1),
});
export type RedditData = z.infer<typeof RedditSchema>;

/* Dribbble */
export const DribbbleSchema = z.object({
  username: z.string().min(1),
});
export type DribbbleData = z.infer<typeof DribbbleSchema>;

/* Patreon */
export const PatreonSchema = z.object({
  username: z.string().min(1),
});
export type PatreonData = z.infer<typeof PatreonSchema>;

/* Paypal */
export const PaypalSchema = z.object({
  username: z.string().min(1),
});
export type PaypalData = z.infer<typeof PaypalSchema>;

/* Product Hunt */
export const ProducthuntSchema = z.object({
  username: z.string().min(1),
});
export type ProducthuntData = z.infer<typeof ProducthuntSchema>;

/* Threema */
export const ThreemaSchema = z.object({
  id: z.string().min(1),
});
export type ThreemaData = z.infer<typeof ThreemaSchema>;

/* Signal (link) */
export const SignalSchema = z.object({
  link: z.string().url(),
});
export type SignalData = z.infer<typeof SignalSchema>;

/* OpenStreetMap */
export const OpenstreetmapSchema = z.object({
  username: z.string().min(1),
});
export type OpenstreetmapData = z.infer<typeof OpenstreetmapSchema>;

/* Matrix */
export const MatrixSchema = z.object({
  username: z.string().min(1),
  instance: z.string().min(1),
});
export type MatrixData = z.infer<typeof MatrixSchema>;

/* Generic Fediverse link + handle */
export const FediverseSchema = z.object({
  link: z.string().url(),
  fediverseHandle: z.string().min(1),
});
export type FediverseData = z.infer<typeof FediverseSchema>;

/* Lemmy */
export const LemmySchema = z.object({
  username: z.string().min(1),
  instance: z.string().min(1),
});
export type LemmyWidgetData = z.infer<typeof LemmySchema>;

/* Buymeacoffee */
export const BuymeacoffeeSchema = z.object({
  username: z.string().min(1),
});
export type BuymeacoffeeData = z.infer<typeof BuymeacoffeeSchema>;

/* Vernissage (assumed username) */
export const VernissageSchema = z.object({
  username: z.string().min(1),
});
export type VernissageData = z.infer<typeof VernissageSchema>;

/* Location */
export const LocationSchema = z.object({
  lon: z.string().min(1),
  lat: z.string().min(1),
  zoom: z.number(),
});
export type LocationWidgetData = z.infer<typeof LocationSchema>;

/* Weather widget (coords as strings in your original) */
export const WeatherSchema = z.object({
  lon: z.string().min(1),
  lat: z.string().min(1),
});
export type WeatherWidgetData = z.infer<typeof WeatherSchema>;

/* Text */
export const TextSchema = z.object({
  text: z.string().min(1),
});
export type TextData = z.infer<typeof TextSchema>;

/* GitHub user data (API data shape -> validated as much as reasonable) */
export const ContributionDaySchema = z.object({
  color: z.string(),
  contributionCount: z.number(),
  date: z.string(),
  weekday: z.number(),
});
export type ContributionDay = z.infer<typeof ContributionDaySchema>;

export const ContributionsWeekSchema = z.object({
  contributionDays: z.array(ContributionDaySchema),
  firstDay: z.string(),
});
export type ContributionsWeek = z.infer<typeof ContributionsWeekSchema>;

export const ContributionsCollectionSchema = z.object({
  colors: z.array(z.string()),
  totalContributions: z.number(),
  weeks: z.array(ContributionsWeekSchema),
});
export type ContributionsCollection = z.infer<typeof ContributionsCollectionSchema>;

export const GithubSchema = z.object({
  username: z.string().min(1),
  name: z.string().nullable(),
  avatar: z.string().nullable(),
  url: z.string().min(1),
  location: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  publicRepos: z.number(),
  contributions: ContributionsCollectionSchema,
});
export type GithubApiData = z.infer<typeof GithubSchema>;

/* Codeberg */
export const CodebergSchema = z.object({
  username: z.string().min(1),
});
export type CodebergData = z.infer<typeof CodebergSchema>;

/* Timezone */
export const TimezoneSchema = z.object({
  timezone: z.string().min(1),
});
export type TimezoneData = z.infer<typeof TimezoneSchema>;

/* LiberaPay */
export const LiberaPaySchema = z.object({
  username: z.string().min(1),
});
export type LiberaPayData = z.infer<typeof LiberaPaySchema>;

/* Record Club */
export const RecordClubSchema = z.object({
  username: z.string().min(1),
});
export type RecordClubData = z.infer<typeof RecordClubSchema>;

/* ListenBrainz */
export const ListenBrainzSchema = z.object({
  username: z.string().min(1),
});
export type ListenBrainzData = z.infer<typeof ListenBrainzSchema>;

/* Kofi */
export const KofiSchema = z.object({
  username: z.string().min(1),
});
export type KofiData = z.infer<typeof KofiSchema>;

/* Image widget */
export const ImageWidgetSchema = z.object({
  image: z.string().min(1),
  link: z.string().url().optional().nullable(),
});
export type ImageWidgetData = z.infer<typeof ImageWidgetSchema>;

/* Note widget */
export const NoteSchema = z.object({
  note: z.string().min(1),
});
export type NoteWidgetData = z.infer<typeof NoteSchema>;

/* Country widget */
export const CountrySchema = z.object({
  countryName: z.string().min(1),
});
export type CountryWidgetData = z.infer<typeof CountrySchema>;

/* Email */
export const EmailSchema = z.object({
  email: z.string().email(),
});
export type EmailData = z.infer<typeof EmailSchema>;

/* Link */
export const LinkSchema = z.object({
  link: z.string().url(),
  label: z.string().optional().nullable(),
});
export type LinkData = z.infer<typeof LinkSchema>;

/* ---------------------------
   widgetSchemas lookup & WidgetData union
   --------------------------- */

export const widgetSchemas = {
  mastodon: MastodonSchema,
  pixelfed: PixelfedSchema,
  loops: LoopsSchema,
  bookwyrm: BookWyrmSchema,
  peertube: PeertubeSchema,
  neodb: NeoDBSchema,
  glassphoto: GlassPhotoSchema,
  bluesky: BlueskySchema,
  instagram: InstagramSchema,
  threads: ThreadsSchema,
  strava: StravaSchema,
  linkedin: LinkedinSchema,
  facebook: FacebookSchema,
  x: XSchema,
  pinterest: PinterestSchema,
  youtube: YoutubeSchema,
  telegram: TelegramSchema,
  socialfolio: SocialfolioSchema,
  gitlab: GitlabSchema,
  reddit: RedditSchema,
  dribbble: DribbbleSchema,
  patreon: PatreonSchema,
  paypal: PaypalSchema,
  producthunt: ProducthuntSchema,
  threema: ThreemaSchema,
  signal: SignalSchema,
  openstreetmap: OpenstreetmapSchema,
  matrix: MatrixSchema,
  fediverse: FediverseSchema,
  lemmy: LemmySchema,
  buymeacoffee: BuymeacoffeeSchema,
  vernissage: VernissageSchema,
  location: LocationSchema,
  weather: WeatherSchema,
  text: TextSchema,
  github: GithubSchema,
  codeberg: CodebergSchema,
  timezone: TimezoneSchema,
  liberapay: LiberaPaySchema,
  recordclub: RecordClubSchema,
  listenbrainz: ListenBrainzSchema,
  kofi: KofiSchema,
  image: ImageWidgetSchema,
  note: NoteSchema,
  country: CountrySchema,
  email: EmailSchema,
  link: LinkSchema,
} as const;

/**
 * WidgetData is the union of all schema outputs.
 * Use this for typing widget.data everywhere.
 */
export type WidgetData = z.infer<
  (typeof widgetSchemas)[keyof typeof widgetSchemas]
>;

/* WidgetApiData remains a union of API-return types (keeps your earlier external API types) */
export type WidgetApiData = MastodonApiData | GithubApiData | WeatherApiData;
