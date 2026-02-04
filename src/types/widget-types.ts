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

export const instanceSchema = z
  .string()
  .min(1, "Instance is required")
  .regex(
    /^(https?:\/\/)?((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}$/,
    "Enter a valid domain"
  );

export const urlSchema = z
  .string()
  .min(1, "URL is required")
  .regex(
    /^https:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*$/,
    "Enter a valid URL"
  );

export const optionalUrlSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (val) => !val || /^https:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*$/.test(val),
    {
      message: "Must be a valid URL",
    }
  );

export const usernameSchema = z
  .string()
  .min(1, "Username is required")
  .regex(
    /^[a-zA-Z0-9._]{1,30}$/,
    "Enter a valid username"
  );

/* ---------------------------
   Zod schemas + inferred types
   --------------------------- */

/* Mastodon */
export const MastodonSchema = z.object({
  username: usernameSchema,
  instance: instanceSchema
});
export type MastodonData = z.infer<typeof MastodonSchema>;

/* Pixelfed */
export const PixelfedSchema = z.object({
  username: usernameSchema,
  instance: instanceSchema,
});
export type PixelfedData = z.infer<typeof PixelfedSchema>;

/* Loops */
export const LoopsSchema = z.object({
  username: usernameSchema,
  instance: instanceSchema,
});
export type LoopsData = z.infer<typeof LoopsSchema>;

/* BookWyrm */
export const BookWyrmSchema = z.object({
  username: usernameSchema,
  instance: instanceSchema,
});
export type BookWyrmWidgetData = z.infer<typeof BookWyrmSchema>;

/* Peertube */
export const PeertubeSchema = z.object({
  username: usernameSchema,
  instance: instanceSchema,
});
export type PeertubeData = z.infer<typeof PeertubeSchema>;

/* NeoDB */
export const NeoDBSchema = z.object({
  username: usernameSchema,
  instance: instanceSchema,
});
export type NeoDBData = z.infer<typeof NeoDBSchema>;

/* Glass (Glass.photo) */
export const GlassPhotoSchema = z.object({
  username: usernameSchema,
});
export type GlassPhotoData = z.infer<typeof GlassPhotoSchema>;

/* Bluesky */
export const BlueskySchema = z.object({
  handle: z.string().min(1),
});
export type BlueskyData = z.infer<typeof BlueskySchema>;

/* Instagram */
export const InstagramSchema = z.object({
  username: usernameSchema,
});
export type InstagramData = z.infer<typeof InstagramSchema>;

/* Threads */
export const ThreadsSchema = z.object({
  username: usernameSchema,
});
export type ThreadsData = z.infer<typeof ThreadsSchema>;

/* Strava */
export const StravaSchema = z.object({
  username: usernameSchema,
});
export type StravaData = z.infer<typeof StravaSchema>;

/* Linkedin */
export const LinkedinSchema = z.object({
  username: usernameSchema,
});
export type LinkedinData = z.infer<typeof LinkedinSchema>;

/* Facebook */
export const FacebookSchema = z.object({
  username: usernameSchema,
});
export type FacebookData = z.infer<typeof FacebookSchema>;

/* X */
export const XSchema = z.object({
  username: usernameSchema,
});
export type XData = z.infer<typeof XSchema>;

/* Pinterest */
export const PinterestSchema = z.object({
  username: usernameSchema,
});
export type PinterestData = z.infer<typeof PinterestSchema>;

/* YouTube (handle) */
export const YoutubeSchema = z.object({
  handle: z.string().min(1),
});
export type YoutubeData = z.infer<typeof YoutubeSchema>;

/* Telegram */
export const TelegramSchema = z.object({
  username: usernameSchema,
});
export type TelegramData = z.infer<typeof TelegramSchema>;

/* SocialFolio */
export const SocialfolioSchema = z.object({
  username: usernameSchema,
});
export type SocialfolioData = z.infer<typeof SocialfolioSchema>;

/* GitLab */
export const GitlabSchema = z.object({
  instance: instanceSchema,
  username: usernameSchema,
});
export type GitlabData = z.infer<typeof GitlabSchema>;

/* Reddit */
export const RedditSchema = z.object({
  username: usernameSchema,
});
export type RedditData = z.infer<typeof RedditSchema>;

/* Dribbble */
export const DribbbleSchema = z.object({
  username: usernameSchema,
});
export type DribbbleData = z.infer<typeof DribbbleSchema>;

/* Patreon */
export const PatreonSchema = z.object({
  username: usernameSchema,
});
export type PatreonData = z.infer<typeof PatreonSchema>;

/* Paypal */
export const PaypalSchema = z.object({
  username: usernameSchema,
});
export type PaypalData = z.infer<typeof PaypalSchema>;

/* Product Hunt */
export const ProducthuntSchema = z.object({
  username: usernameSchema,
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
  username: usernameSchema,
});
export type OpenstreetmapData = z.infer<typeof OpenstreetmapSchema>;

/* Matrix */
export const MatrixSchema = z.object({
  username: usernameSchema,
  instance: instanceSchema,
});
export type MatrixData = z.infer<typeof MatrixSchema>;

/* Generic Fediverse link + handle */
export const FediverseSchema = z.object({
  link: urlSchema,
  fediverseHandle: z.string().min(1),
});
export type FediverseData = z.infer<typeof FediverseSchema>;

/* Lemmy */
export const LemmySchema = z.object({
  username: usernameSchema,
  instance: instanceSchema,
});
export type LemmyWidgetData = z.infer<typeof LemmySchema>;

/* Buymeacoffee */
export const BuymeacoffeeSchema = z.object({
  username: usernameSchema,
});
export type BuymeacoffeeData = z.infer<typeof BuymeacoffeeSchema>;

/* Vernissage (assumed username) */
export const VernissageSchema = z.object({
  username: usernameSchema,
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

export const GithubApiSchema = z.object({
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
export type GithubApiData = z.infer<typeof GithubApiSchema>;

export const GithubSchema = z.object({
  username: usernameSchema,
});
export type GithubData = z.infer<typeof GithubSchema>;

/* Codeberg */
export const CodebergSchema = z.object({
  username: usernameSchema,
});
export type CodebergData = z.infer<typeof CodebergSchema>;

/* Timezone */
export const TimezoneSchema = z.object({
  timezone: z.string().min(1),
});
export type TimezoneData = z.infer<typeof TimezoneSchema>;

/* LiberaPay */
export const LiberaPaySchema = z.object({
  username: usernameSchema,
});
export type LiberaPayData = z.infer<typeof LiberaPaySchema>;

/* Record Club */
export const RecordClubSchema = z.object({
  username: usernameSchema,
});
export type RecordClubData = z.infer<typeof RecordClubSchema>;

/* ListenBrainz */
export const ListenBrainzSchema = z.object({
  username: usernameSchema,
});
export type ListenBrainzData = z.infer<typeof ListenBrainzSchema>;

/* Kofi */
export const KofiSchema = z.object({
  username: usernameSchema,
});
export type KofiData = z.infer<typeof KofiSchema>;

/* Image widget */
export const ImageWidgetSchema = z.object({
  image: z.string().min(1),
  link: optionalUrlSchema,
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
