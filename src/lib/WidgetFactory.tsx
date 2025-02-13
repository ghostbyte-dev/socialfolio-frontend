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

export function WidgetFactory({ widget }: { widget: WidgetProps }) {
  switch (widget.type) {
    case "mastodon":
      return (
        <MastodonWidget
          data={widget.data as MastodonData}
          size={widget.size}
          variant={widget.variant}
        />
      );
    case "pixelfed":
      return (
        <PixelfedWidget
          data={widget.data as PixelfedData}
          size={widget.size}
          variant={widget.variant}
        />
      );
    case "github":
      return (
        <GithubWidget
          data={widget.data as GitHubData}
          size={widget.size}
          variant={widget.variant}
        />
      );
    case "image":
      return (
        <ImageWidget
          data={widget.data as ImageWidgetData}
          size={widget.size}
          variant={widget.variant}
        />
      );
      case "liberapay":
      return (
        <LiberaPayWidget
          data={widget.data as LiberaPayData}
          size={widget.size}
          variant={widget.variant}
        />
      );
    default:
      return (
        <BaseWidget>
          <div>Unknown Widget Type</div>
        </BaseWidget>
      );
  }
}
