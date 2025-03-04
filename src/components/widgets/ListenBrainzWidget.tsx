import { ListenBrainzData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface ListenBrainzWidgetProps {
  data: ListenBrainzData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function ListenBrainzWidget({ data, size, variant, isOwner, deleteWidget, editWidget }: ListenBrainzWidgetProps) {

  const onClick = () => {
    const url = "https://listenbrainz.org/user/" + data.username;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <BaseWidget isOwner={isOwner} isClickable={true} deleteWidget={deleteWidget} editWidget={editWidget} onClick={onClick}>
      {variant == 1 && (
          <div className="h-full w-full flex justify-center items-center">
            <img
              src="/widgeteditor/listenbrainz.svg"
              alt="LiberaPay logo"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
      )}
    </BaseWidget>
  );
}
