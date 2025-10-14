import type { NeoDBData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface NeoDBWidgetProps {
  data: NeoDBData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function NeoDbWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: NeoDBWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`${data.instance}/users/${data.username}`}
    >
      {variant == 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgets/neodb/neodb_dark.svg"
            alt="NeoDB logo"
            className="w-[50%] h-[50%] object-contain block dark:hidden"
          />
          <img
            src="/widgets/neodb/neodb_light.svg"
            alt="NeoDB logo"
            className="w-[50%] h-[50%] object-contain hidden dark:block"
          />
        </div>
      )}
    </BaseWidget>
  );
}
