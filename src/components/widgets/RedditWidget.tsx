import type { RedditData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface RedditWidgetProps {
  data: RedditData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function RedditWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: RedditWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://reddit.com/user/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#ff4500]">
          <div className="w-3/4 h-3/4 relative">
            <Image
              src="/widgets/reddit/reddit_icon.svg"
              alt="Reddit logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
