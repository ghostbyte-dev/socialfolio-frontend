import { MastodonData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

export function MastodonWidget({ data }: { data: MastodonData }) {
  return (
    <BaseWidget>
      <div>
        <h3 className="text-gray-800 font-bold">Mastodon</h3>
        <p>Username: {data.username}</p>
      </div>
    </BaseWidget>
  );
}
