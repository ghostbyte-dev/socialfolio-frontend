import type { LinkData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import LinkIcon from "@/assets/icons/link.svg";

interface LinkWidgetProps {
  data: LinkData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function LinkWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: LinkWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={data.link}
    >
      {variant === 1 && (
        <div className="h-full w-full justify-center items-center flex flex-col">
          <LinkIcon className="w-[30%] h-[30%]" />

          {data.link && (
            <p className="break-words max-w-full">
              {data.label !== "" && data.label
                ? data.label
                : data.link.replace(/^https?:\/\//i, "")}
            </p>
          )}
        </div>
      )}
    </BaseWidget>
  );
}
