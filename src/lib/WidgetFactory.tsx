import { BaseWidget } from "@/components/widgets/BaseWidget";
import { GithubWidget } from "@/components/widgets/GithubWidget";
import { MastodonWidget } from "@/components/widgets/MastodonWidget";
import { GitHubData, MastodonData, WidgetProps } from "@/types/widget-types";

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
      case "github":
      return (
        <GithubWidget
          data={widget.data as GitHubData}
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
