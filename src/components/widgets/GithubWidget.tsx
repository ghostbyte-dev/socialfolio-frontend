import { GitHubData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";

interface GithubWidgetProps {
  data: GitHubData;
  size: { cols: number; rows: number };
  variant: number;
}

export function GithubWidget({ data, size, variant }: GithubWidgetProps) {
  return (
    <BaseWidget>
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
    </BaseWidget>
  );
}
