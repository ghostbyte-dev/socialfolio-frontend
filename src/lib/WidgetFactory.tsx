import { AddNewWidget } from "@/components/widgets/AddNewWidget";
import { BaseWidget } from "@/components/widgets/BaseWidget";
import { BlueskyWidget } from "@/components/widgets/BlueskyWidget";
import { BookWyrmWiget } from "@/components/widgets/BookWyrmWidget";
import { BuyMeACoffeeWidget } from "@/components/widgets/BuyMeACoffeeWidget";
import { CodebergWidget } from "@/components/widgets/CodebergWidget";
import { CountryWidget } from "@/components/widgets/CountryWidget";
import { EmailWidget } from "@/components/widgets/EmailWidget";
import { FacebookWidget } from "@/components/widgets/FacebookWidget";
import { FediverseWidget } from "@/components/widgets/Fediverse";
import { GithubWidget } from "@/components/widgets/GithubWidget";
import { GitlabWidget } from "@/components/widgets/GitlabWidget";
import { GlassPhotoWidget } from "@/components/widgets/GlassPhotoWidget";
import { ImageWidget } from "@/components/widgets/ImageWidget";
import { InstagramWidget } from "@/components/widgets/InstagramWidget";
import { KofiWidget } from "@/components/widgets/KofiWidget";
import { LemmyWidget } from "@/components/widgets/LemmyWidget";
import { LiberaPayWidget } from "@/components/widgets/LiberaPayWidget";
import { LinkedinWidget } from "@/components/widgets/LinkedinWidget";
import { LinkWidget } from "@/components/widgets/LinkWidget";
import { ListenBrainzWidget } from "@/components/widgets/ListenBrainzWidget";
import { LocationWidget } from "@/components/widgets/LocationWidget";
import { LoopsWidget } from "@/components/widgets/LoopsWidget";
import { MastodonWidget } from "@/components/widgets/MastodonWidget";
import { MatrixWidget } from "@/components/widgets/MatrixWidget";
import { NeoDbWidget } from "@/components/widgets/NeoDBWidget";
import { NoteWidget } from "@/components/widgets/NoteWidget";
import { PeertubeWidget } from "@/components/widgets/Peertube";
import { PinterestWidget } from "@/components/widgets/PinterestWidget";
import { PixelfedWidget } from "@/components/widgets/PixelfedWidget";
import { RecordClubWidget } from "@/components/widgets/RecordClubWidget";
import { RedditWidget } from "@/components/widgets/RedditWidget";
import { SocialfolioWidget } from "@/components/widgets/SocialfolioWidget";
import { StravaWidget } from "@/components/widgets/StravaWidget";
import { TelegramWidget } from "@/components/widgets/TelegramWidget";
import { ThreadsWidget } from "@/components/widgets/ThreadsWidget";
import { TimezoneWidget } from "@/components/widgets/TimezoneWidget";
import { VernissageWidget } from "@/components/widgets/VernissageWidget";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { XWidget } from "@/components/widgets/XWidget";
import { YoutubeWidget } from "@/components/widgets/YoutubeWidget";
import type {
  BlueskyData,
  BookWyrmWidgetData,
  BuymeacoffeeData,
  CodebergData,
  CountryWidgetData,
  EmailData,
  FacebookData,
  FediverseData,
  GitHubData,
  GitlabData,
  GlassPhotoData,
  ImageWidgetData,
  InstagramData,
  KofiData,
  LemmyWidgetData,
  LiberaPayData,
  LinkData,
  LinkedinData,
  ListenBrainzData,
  LocationWidgetData,
  LoopsData,
  MastodonData,
  MatrixData,
  NeoDBData,
  NoteWidgetData,
  PeertubeData,
  PinterestData,
  PixelfedData,
  RecordClubData,
  RedditData,
  SocialfolioData,
  StravaData,
  TelegramData,
  ThreadsData,
  TimezoneData,
  VernissageData,
  WeatherWidgetData,
  WidgetProps,
  XData,
  YoutubeData,
} from "@/types/widget-types";

export function WidgetFactory({
  widget,
  isOwner,
  deleteWidget,
  editWidget,
  preview = false,
}: {
  widget: WidgetProps;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
  preview?: boolean;
}) {
  switch (widget.type) {
    case "mastodon":
      return (
        <MastodonWidget
          id={widget.id}
          data={widget.data as MastodonData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
          preview={preview}
        />
      );
    case "pixelfed":
      return (
        <PixelfedWidget
          data={widget.data as PixelfedData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "loops":
      return (
        <LoopsWidget
          data={widget.data as LoopsData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "lemmy":
      return (
        <LemmyWidget
          data={widget.data as LemmyWidgetData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "fediverse":
      return (
        <FediverseWidget
          data={widget.data as FediverseData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "matrix":
      return (
        <MatrixWidget
          data={widget.data as MatrixData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "peertube":
      return (
        <PeertubeWidget
          data={widget.data as PeertubeData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "vernissage":
      return (
        <VernissageWidget
          data={widget.data as VernissageData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "bookwyrm":
      return (
        <BookWyrmWiget
          data={widget.data as BookWyrmWidgetData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "bluesky":
      return (
        <BlueskyWidget
          data={widget.data as BlueskyData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "instagram":
      return (
        <InstagramWidget
          data={widget.data as InstagramData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "threads":
      return (
        <ThreadsWidget
          data={widget.data as ThreadsData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "linkedin":
      return (
        <LinkedinWidget
          data={widget.data as LinkedinData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "strava":
      return (
        <StravaWidget
          data={widget.data as StravaData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "reddit":
      return (
        <RedditWidget
          data={widget.data as RedditData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "facebook":
      return (
        <FacebookWidget
          data={widget.data as FacebookData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "x":
      return (
        <XWidget
          data={widget.data as XData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "pinterest":
      return (
        <PinterestWidget
          data={widget.data as PinterestData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "youtube":
      return (
        <YoutubeWidget
          data={widget.data as YoutubeData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "telegram":
      return (
        <TelegramWidget
          data={widget.data as TelegramData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "socialfolio":
      return (
        <SocialfolioWidget
          data={widget.data as SocialfolioData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "gitlab":
      return (
        <GitlabWidget
          data={widget.data as GitlabData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "listenbrainz":
      return (
        <ListenBrainzWidget
          data={widget.data as ListenBrainzData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "recordclub":
      return (
        <RecordClubWidget
          data={widget.data as RecordClubData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "neodb":
      return (
        <NeoDbWidget
          data={widget.data as NeoDBData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "glassphoto":
      return (
        <GlassPhotoWidget
          data={widget.data as GlassPhotoData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "github":
      return (
        <GithubWidget
          id={widget.id}
          data={widget.data as GitHubData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
          preview={preview}
        />
      );
    case "codeberg":
      return (
        <CodebergWidget
          data={widget.data as CodebergData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "image":
      return (
        <ImageWidget
          data={widget.data as ImageWidgetData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "liberapay":
      return (
        <LiberaPayWidget
          data={widget.data as LiberaPayData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "buymeacoffee":
      return (
        <BuyMeACoffeeWidget
          data={widget.data as BuymeacoffeeData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "kofi":
      return (
        <KofiWidget
          data={widget.data as KofiData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "location":
      return (
        <LocationWidget
          data={widget.data as LocationWidgetData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "weather":
      return (
        <WeatherWidget
          id={widget.id}
          data={widget.data as WeatherWidgetData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
          preview={preview}
        />
      );
    case "country":
      return (
        <CountryWidget
          data={widget.data as CountryWidgetData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "localTime":
      return (
        <TimezoneWidget
          data={widget.data as TimezoneData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "note":
      return (
        <NoteWidget
          data={widget.data as NoteWidgetData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "email":
      return (
        <EmailWidget
          data={widget.data as EmailData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );
    case "link":
      return (
        <LinkWidget
          data={widget.data as LinkData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        />
      );

    case "newwidget":
      return <AddNewWidget />;
    default:
      return (
        <BaseWidget
          isOwner={false}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        >
          <div>Unknown Widget Type</div>
        </BaseWidget>
      );
  }
}
