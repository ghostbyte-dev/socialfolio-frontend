import type { ThreadsData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface ThreadsWidgetProps {
  data: ThreadsData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function ThreadsWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: ThreadsWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://threads.com/@${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-black">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/threads/threads_logo.svg"
              alt="Threads logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
