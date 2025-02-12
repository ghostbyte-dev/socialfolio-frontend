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
          <div className="h-full w-full p-20 bg-[#171515]">
            <img
              src="/widgets/github/github-logo-white.webp"
              alt="Mastodon logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
      )}

      {variant == 2 && (
        <Link href={"https://github.com/" + data.username}>
          <div className="h-full w-full p-20 bg-[#fff]">
            <img
              src="/widgets/github/github-logo-dark.webp"
              alt="Mastodon logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
      )}
    </BaseWidget>
  );
}
