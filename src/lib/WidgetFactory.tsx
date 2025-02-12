import { MastodonWidget } from "@/components/widgets/MastodonWidget";
import { MastodonData, WidgetProps } from "@/types/widget-types";

export function WidgetFactory({ widget }: { widget: WidgetProps }) {
  switch (widget.type) {
    case "mastodon":
      return <MastodonWidget data={widget.data as MastodonData} />;
    default:
      return <div>Unknown Widget Type</div>;
  }
}