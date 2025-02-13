import { AddNewWidget } from "@/components/widgets/AddNewWidget";
import { BaseWidget } from "@/components/widgets/BaseWidget";
import { GithubWidget } from "@/components/widgets/GithubWidget";
import { ImageWidget } from "@/components/widgets/ImageWidget";
import { LiberaPayWidget } from "@/components/widgets/LiberaPayWidget";
import { MastodonWidget } from "@/components/widgets/MastodonWidget";
import { PixelfedWidget } from "@/components/widgets/PixelfedWidget";
import {
  GitHubData,
  ImageWidgetData,
  LiberaPayData,
  MastodonData,
  PixelfedData,
  WidgetProps,
} from "@/types/widget-types";

export function WidgetFactory({
  widget,
  isOwner,
  deleteWidget,
}: {
  widget: WidgetProps;
  isOwner: boolean;
  deleteWidget: () => void;
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
        />
      );
    case "github":
      return (
        <GithubWidget
          data={widget.data as GitHubData}
          size={widget.size}
          variant={widget.variant}
          isOwner={isOwner}
          deleteWidget={deleteWidget}
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
        />
      );

    case "newwidget":
      return <AddNewWidget size={widget.size} />;
    default:
      return (
        <BaseWidget isOwner={false} deleteWidget={deleteWidget}>
          <div>Unknown Widget Type</div>
        </BaseWidget>
      );
  }
}
