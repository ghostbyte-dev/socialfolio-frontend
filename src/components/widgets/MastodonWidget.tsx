import { MastodonData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";
import Image from "next/image";

interface MastodonWidgetProps {
  data: MastodonData;
  size: { cols: number; rows: number };
  variant: number;
}

export function MastodonWidget({ data, size, variant }: MastodonWidgetProps) {
  return (
    <BaseWidget>
    
      {variant == 1 && (
        <Link href={"https://" + data.instance + "/@" + data.username}>
        <div
          className={`h-full w-full p-20 bg-[#6364ff] variant-${variant}`}
        >
          <img src="/widgets/mastodon/mastodon-logo-white.webp" alt="Mastodon logo" className="w-full h-full object-contain"/>
        </div>
        </Link>
        
      )}
    </BaseWidget>
  );
}
