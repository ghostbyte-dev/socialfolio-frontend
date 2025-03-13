import { AddNewWidget } from "@/components/widgets/AddNewWidget";
import { BaseWidget } from "@/components/widgets/BaseWidget";
import { BlueskyWidget } from "@/components/widgets/BlueskyWidget";
import { BookWyrmWiget } from "@/components/widgets/BookWyrmWidget";
import { BuyMeACoffeeWidget } from "@/components/widgets/BuyMeACoffeeWidget";
import { CodebergWidget } from "@/components/widgets/CodebergWidget";
import { CountryWidget } from "@/components/widgets/CountryWidget";
import { EmailWidget } from "@/components/widgets/EmailWidget";
import { FediverseWidget } from "@/components/widgets/Fediverse";
import { GithubWidget } from "@/components/widgets/GithubWidget";
import { GlassPhotoWidget } from "@/components/widgets/GlassPhotoWidget";
import { ImageWidget } from "@/components/widgets/ImageWidget";
import { KofiWidget } from "@/components/widgets/KofiWidget";
import { LemmyWidget } from "@/components/widgets/LemmyWidget";
import { LiberaPayWidget } from "@/components/widgets/LiberaPayWidget";
import { LinkWidget } from "@/components/widgets/LinkWidget";
import { ListenBrainzWidget } from "@/components/widgets/ListenBrainzWidget";
import { LocationWidget } from "@/components/widgets/LocationWidget";
import { MastodonWidget } from "@/components/widgets/MastodonWidget";
import { MatrixWidget } from "@/components/widgets/MatrixWidget";
import { NeoDbWidget } from "@/components/widgets/NeoDBWidget";
import { NoteWidget } from "@/components/widgets/NoteWidget";
import { PeertubeWidget } from "@/components/widgets/Peertube";
import { PixelfedWidget } from "@/components/widgets/PixelfedWidget";
import { RecordClubWidget } from "@/components/widgets/RecordClubWidget";
import { TimezoneWidget } from "@/components/widgets/TimezoneWidget";
import { VernissageWidget } from "@/components/widgets/VernissageWidget";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import {
  BlueskyData,
  BookWyrmWidgetData,
  BuymeacoffeeData,
  CodebergData,
  CountryWidgetData,
  EmailData,
  FediverseData,
  GitHubData,
  GlassPhotoData,
  ImageWidgetData,
  KofiData,
  LemmyWidgetData,
  LiberaPayData,
  LinkData,
  ListenBrainzData,
  LocationWidgetData,
  MastodonData,
  MatrixData,
  NeoDBData,
  NoteWidgetData,
  PeertubeData,
  PixelfedData,
  RecordClubData,
  TimezoneData,
  VernissageData,
  WeatherWidgetData,
  WidgetProps,
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
      return <AddNewWidget size={widget.size} />;
    default:
      return (
        <BaseWidget
          isOwner={false}
          isClickable={true}
          deleteWidget={deleteWidget}
          editWidget={editWidget}
        >
          <div>Unknown Widget Type</div>
        </BaseWidget>
      );
  }
}
