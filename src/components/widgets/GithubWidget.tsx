import {
  ContributionDay,
  ContributionsCollection,
  ContributionsWeek,
  GithubApiData,
  GitHubData,
  WidgetSize,
} from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { WidgetService } from "@/services/widget.service";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface GithubWidgetProps {
  id: string;
  data: GitHubData;
  size: WidgetSize;
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function GithubWidget({
  id,
  data,
  size,
  variant,
  isOwner,
  deleteWidget,
  editWidget,
}: GithubWidgetProps) {
  const [widgetSize, setWidgetSize] = useState(size);
  const needApiData = (): boolean => {
    if (variant == 3) {
      return true;
    } else {
      return false;
    }
  };

  const {
    data: widgetApiData,
    isLoading: widgetApiDataIsLoading,
    error: widgetApiDataError,
  } = useQuery<GithubApiData>({
    queryKey: ["githubWidgetData", id],
    queryFn: () => WidgetService.getWidgetData(id) as Promise<GithubApiData>,
    enabled: needApiData() && id !== "",
  });

  const getDisplayedWeeks = (size: WidgetSize): number => {
    switch (size.cols) {
      case 1:
        return 10;
      case 2:
        return 20;
      default:
        return 10;
    }
  };

  const getContributions = (
    contributions: ContributionsCollection,
    size: WidgetSize
  ): ContributionsCollection => {
    let numberOfWeeks = getDisplayedWeeks(size);
    const newContributions = { ...contributions };
    newContributions.weeks = contributions.weeks.slice(-numberOfWeeks);
    return newContributions;
  };

  useEffect(() => {
    setWidgetSize(size);
  }, [size]);

  const displayedContributions = useMemo(() => {
    console.log(
      "Recalculating contributions:",
      widgetSize,
      widgetApiData?.contributions
    );
    const contributions = getContributions(
      widgetApiData?.contributions ?? {
        weeks: [],
        colors: [],
        totalContributions: 0,
      },
      widgetSize
    );
    return contributions;
  }, [widgetSize, widgetApiData?.contributions]);

  const customColors = [
    "#ccd1e0", // Very light blue (lighter than primary color)
    "#8999c7", // Light blue
    "#4c63a4", // Primary blue (#495d92 adjusted)
    "#2e4180", // Darker blue
    "#1b2a5d", // Very dark blue (almost navy)
  ];

  function contributionDayColor(contributionCount: number) {
    if (!widgetApiData) {
      return;
    }
    const maxContributions = Math.max(
      ...widgetApiData.contributions.weeks.flatMap((c: ContributionsWeek) =>
        c.contributionDays.map((d: ContributionDay) => d.contributionCount)
      )
    );
    if (contributionCount === 0) return customColors[0]; // No contribution
    const intensity = contributionCount / maxContributions;

    if (intensity > 0.75) return customColors[4];
    if (intensity > 0.5) return customColors[3];
    if (intensity > 0.25) return customColors[2];
    return customColors[1];
  }

  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
    >
      {variant == 1 && (
        <Link href={"https://github.com/" + data.username}>
          <div className="h-full w-full flex justify-center items-center bg-[#171515]">
            <img
              src="/widgets/github/github-logo-white.webp"
              alt="Mastodon logo"
              className="w-[50%] h-[50%] object-contain"
            />
          </div>
        </Link>
      )}

      {variant == 2 && (
        <Link href={"https://github.com/" + data.username}>
          <div className="h-full w-full flex justify-center items-center bg-[#fff]">
            <img
              src="/widgets/github/github-logo-dark.webp"
              alt="Mastodon logo"
              className="w-[50%] h-[50%] object-contain"
            />
          </div>
        </Link>
      )}

      {variant == 3 && (
        <Link href={"https://github.com/" + data.username}>
          <div className="h-full w-full flex flex-col p-8">
            {widgetApiDataIsLoading ? <p>Loading...</p> : <></>}
            {widgetApiDataError ? <p>{widgetApiDataError.message}</p> : <></>}
            {widgetApiData ? (
              <>
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src={widgetApiData.avatar ?? "/defaults/default-avatar.jpg"}
                    alt="Mastodon logo"
                    height={64}
                    width={64}
                    className="rounded-2xl object-contain"
                  />
                  <h3 className="text-xl">{widgetApiData.name}</h3>
                </div>
                {widgetSize.rows > 1 && widgetSize.cols > 1 ? (
                  <>
                    <div className="flex flex-row gap-10">
                      <p>Followers: {widgetApiData.followers}</p>
                      <p>Following: {widgetApiData.following}</p>
                      <p>Public Repos: {widgetApiData.publicRepos}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div
                  className="grid mt-5 grid-flow-col"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${
                      getContributions(widgetApiData.contributions, widgetSize)
                        .weeks.length
                    }, 1fr)`,
                    gridTemplateRows: "repeat(7, 1fr)",
                    gap: "3px",
                    height: "100%",
                    maxHeight: "161px",
                  }}
                >
                  {displayedContributions.weeks.map((week: ContributionsWeek) =>
                    week.contributionDays.map((day: ContributionDay) => (
                      <div
                        key={day.date}
                        className="rounded-xs"
                        style={{
                          backgroundColor: contributionDayColor(
                            day.contributionCount
                          ),
                          width: "100%",
                          height: "100%",
                          maxHeight: "20px",
                        }}
                      ></div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </Link>
      )}
    </BaseWidget>
  );
}
