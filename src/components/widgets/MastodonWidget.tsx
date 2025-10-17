import type { MastodonData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import { useQuery } from "@tanstack/react-query";
import { WidgetService } from "@/services/widget.service";
import Image from "next/image";

interface MastodonWidgetProps {
  id: string;
  data: MastodonData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
  preview?: boolean;
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

export interface WeatherApiData {
  elevation: number;
  current: {
    weatherCode: number;
    temperature: string;
  };
  isDay: boolean;
}

export function MastodonWidget({
  id,
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
  preview = false,
}: MastodonWidgetProps) {
  const needApiData = (): boolean => {
    if (variant === 1) {
      return false;
    } else {
      return true;
    }
  };

  const { data: apiData, isLoading: widgetApiDataIsLoading } =
    useQuery<MastodonApiData>({
      queryKey: ["mastodonWidgetData", id],
      queryFn: () =>
        WidgetService.getWidgetData(id) as Promise<MastodonApiData>,
      enabled: needApiData() && id !== "",
    });

  const widgetApiData = preview
    ? {
        username: "socialfolio",
        instance: "techhub.social",
        followersCount: 0,
        followingCount: 0,
        statusesCount: 0,
        displayName: "Socialfolio",
      }
    : apiData;

  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`${data.instance}/@${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#6364ff] relative group">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/mastodon/mastodon-logo-white.webp"
              alt="Mastodon logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {variant === 2 && (
        <div className="h-full w-full p-8">
          {widgetApiDataIsLoading && <p>Loading...</p>}
          {widgetApiData && (
            <>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src="/widgets/mastodon/mastodon-logo-white.webp"
                  alt="Mastodon logo"
                  height={64}
                  width={64}
                  className="w-16 h-16 object-contain hidden dark:block"
                />
                <Image
                  src="/widgets/mastodon/mastodon-logo-black.webp"
                  alt="Mastodon logo"
                  height={64}
                  width={64}
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

      {variant === 3 && (
        <div className="h-full w-full p-6 sm:p-5 md:p-8 bg-[#6364ff] text-white flex justify-between flex-col">
          <Image
            src="/widgets/mastodon/mastodon-logo-white.webp"
            alt="Mastodon logo"
            height={64}
            width={64}
            className="object-contain w-14 sm:w-16 md:w-16 lg:w-16"
          />
          <div>
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-1 mt-2">
              Mastodon
            </h3>
            <span className="text-xs sm:text-md">
              @{data.username}@{data.instance?.replace(/^https?:\/\//i, "")}
            </span>
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
