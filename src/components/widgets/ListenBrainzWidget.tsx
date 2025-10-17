import type { ListenBrainzData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

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
          <img
            src="/widgeteditor/listenBrainz.svg"
            alt="ListenBrainz logo"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      )}
    </BaseWidget>
  );
}
