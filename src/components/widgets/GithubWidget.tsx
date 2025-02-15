import { ContributionDay, ContributionsCollection, ContributionsWeek, GithubApiData, GitHubData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { WidgetService } from "@/services/widget.service";
import Image from "next/image";
import { useState } from "react";

interface GithubWidgetProps {
  id: string;
  data: GitHubData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
}

const ContributionsGridGap = 1/3;

export function GithubWidget({
  id,
  data,
  size,
  variant,
  isOwner,
  deleteWidget,
}: GithubWidgetProps) {
  const [boxSize, setBoxSize] = useState(12); // Default size
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

  const getDisplayedWeeks = (): number => {
    if (boxSize < 300) {
      return 10;
    }
    switch(size.cols) {
      case 1:
        return 10;
      case 2:
        return 20;
      default:
        return 10;
    }
  }

  const getContributions = (contributions: ContributionsCollection): ContributionsCollection => {
    console.log(contributions.weeks)
    let numberOfWeeks = getDisplayedWeeks()
    contributions.weeks = contributions.weeks.slice(-numberOfWeeks);
    return contributions;
  }

  const calcContributionsItemSize = (): number => {
    const weeks = getDisplayedWeeks();
    const value = (boxSize - 64) / (weeks + (weeks * ContributionsGridGap));
    return value;
  }

  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      onResize={setBoxSize}
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
                {(size.rows > 1 && size.cols > 1) ? <>
                  <div className="flex flex-row gap-10">
                    <p>
                    Followers: {widgetApiData.followers}
                    </p>
                    <p>
                      Following: {widgetApiData.following}
                    </p>
                    <p>
                      Public Repos: {widgetApiData.publicRepos}
                    </p>
                  </div>
                  
                </>: <></>}
                <div className="flex flex-row mt-5" style={{gap: `${calcContributionsItemSize() * ContributionsGridGap}px`}}>
                  {getContributions(widgetApiData.contributions).weeks.map((week: ContributionsWeek) => {
                    return <div key={week.firstDay} className="flex flex-col gap-1">
                      {week.contributionDays.map((day: ContributionDay) => {
                        return <div className="rounded-sm" style={{backgroundColor: day.color, width: `${calcContributionsItemSize()}px`, height: `${calcContributionsItemSize()}px`}} key={day.date}></div>
                      })}
                    </div>
                  })}
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
