import { AddNewWidget } from "@/components/widgets/AddNewWidget";
import { BaseWidget } from "@/components/widgets/BaseWidget";
import { BlueskyWidget } from "@/components/widgets/BlueskyWidget";
import { BuyMeACoffeeWidget } from "@/components/widgets/BuyMeACoffeeWidget";
import { CodebergWidget } from "@/components/widgets/CodebergWidget";
import { EmailWidget } from "@/components/widgets/EmailWidget";
import { FediverseWidget } from "@/components/widgets/Fediverse";
import { GithubWidget } from "@/components/widgets/GithubWidget";
import { ImageWidget } from "@/components/widgets/ImageWidget";
import { KofiWidget } from "@/components/widgets/KofiWidget";
import { LemmyWidget } from "@/components/widgets/LemmyWidget";
import { LiberaPayWidget } from "@/components/widgets/LiberaPayWidget";
import { LinkWidget } from "@/components/widgets/LinkWidget";
import { MastodonWidget } from "@/components/widgets/MastodonWidget";
import { MatrixWidget } from "@/components/widgets/MatrixWidget";
import { NeoDbWidget } from "@/components/widgets/NeoDBWidget";
import { NoteWidget } from "@/components/widgets/NoteWidget";
import { PeertubeWidget } from "@/components/widgets/Peertube";
import { PixelfedWidget } from "@/components/widgets/PixelfedWidget";
import { TimezoneWidget } from "@/components/widgets/TimezoneWidget";
import { VernissageWidget } from "@/components/widgets/VernissageWidget";
import {
  BlueskyData,
  BuymeacoffeeData,
  CodebergData,
  EmailData,
  FediverseData,
  GitHubData,
  ImageWidgetData,
  KofiData,
  LemmyWidgetData,
  LiberaPayData,
  LinkData,
  MastodonData,
  MatrixData,
  NeoDBData,
  NoteWidgetData,
  PeertubeData,
  PixelfedData,
  TimezoneData,
  VernissageData,
  WidgetProps,
} from "@/types/widget-types";

export function WidgetFactory({
  widget,
  isOwner,
  deleteWidget,
  editWidget,
}: {
  widget: WidgetProps;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
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
