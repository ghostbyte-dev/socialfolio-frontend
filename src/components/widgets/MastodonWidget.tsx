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
          <div className={`h-full w-full p-20 bg-[#6364ff] variant-${variant}`}>
            <img
              src="/widgets/mastodon/mastodon-logo-white.webp"
              alt="Mastodon logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
      )}

      {variant == 2 && (
        <Link href={"https://" + data.instance + "/@" + data.username}>
          <div className="h-full w-full p-8">
            <Image
              src={data.avatar}
              alt="Mastodon logo"
              height={64}
              width={64}
              className="rounded-2xl object-contain"
            />

            <div>
              <p className="text-black">{data.description}</p>
            </div>
          </div>
        </Link>
      )}
    </BaseWidget>
  );
}
