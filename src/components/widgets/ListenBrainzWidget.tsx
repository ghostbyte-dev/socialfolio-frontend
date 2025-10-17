import type { ListenBrainzData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface ListenBrainzWidgetProps {
  data: ListenBrainzData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function ListenBrainzWidget({
  data,
  variant,
  isOwner,
  deleteWidget,
  editWidget,
}: ListenBrainzWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://listenbrainz.org/user/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-3/5 h-3/5 relative">
            <Image
              src="/widgeteditor/listenBrainz.svg"
              alt="ListenBrainz logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
