import { MastodonData, WidgetApiData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { WidgetService } from "@/services/widget.service";

interface MastodonWidgetProps {
  id: string;
  data: MastodonData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export interface MastodonApiData {
  username: string;
  instance: string;
  avatar: string;
  followersCount: number;
  followingCount: number;
  statusesCount: number;
  url: string;
  displayName: string;
  description: string;
}

export function MastodonWidget({
  id,
  data,
  size,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: MastodonWidgetProps) {
  const needApiData = (): boolean => {
    if (variant == 1) {
      return false;
    } else {
      return true;
    }
  };

  const {
    data: widgetApiData,
    isLoading: widgetApiDataIsLoading,
    error,
  } = useQuery<MastodonApiData>({
    queryKey: ["mastodonWidgetData", id],
    queryFn: () => WidgetService.getWidgetData(id) as Promise<MastodonApiData>,
    enabled: needApiData() && id !== "",
  });

  const onClick = () => {
    const url = data.instance + "/@" + data.username;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      onClick={onClick}
    >
      {variant == 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#6364ff] relative group">
          <img
            src="/widgets/mastodon/mastodon-logo-white.webp"
            alt="Mastodon logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}

      {variant == 2 && (
        <div className="h-full w-full p-8">
          {widgetApiDataIsLoading ? <p>Loading...</p> : <></>}
          {widgetApiData && (
            <>
              <div className="flex flex-row gap-4 items-center">
                <img
                  src="/widgets/mastodon/mastodon-logo-white.webp"
                  alt="Mastodon logo"
                  className="w-16 h-16 object-contain hidden dark:block"
                />
                <img
                  src="/widgets/mastodon/mastodon-logo-black.webp"
                  alt="Mastodon logo"
                  className="w-16 h-16 object-contain block dark:hidden"
                />
                <p className="text-xl">{widgetApiData.displayName}</p>
              </div>
              <div className="flex flex-col mt-5 gap-2">
                <p>Follower: {widgetApiData.followersCount}</p>
                <p>Following: {widgetApiData.followingCount}</p>
                <p>Statuses: {widgetApiData.statusesCount}</p>
              </div>
            </>
          )}
        </div>
      )}

      {variant == 3 && (
        <div className="h-full w-full p-[15%] bg-[#6364ff] text-white flex justify-between flex-col">
          <Image
            src="/widgets/mastodon/mastodon-logo-white.webp"
            alt="Mastodon logo"
            width={56}
            height={56}
            className="object-contain"
          />
          <div>
            <h3 className="font-bold text-4xl mb-4">Mastodon</h3>
            <span>
              @{data.username}@{data.instance?.replace(/^https?\:\/\//i, "")}
            </span>
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
