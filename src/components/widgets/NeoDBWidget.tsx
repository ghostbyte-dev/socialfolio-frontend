import type { NeoDBData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

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
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`${data.instance}/users/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/neodb/neodb_dark.svg"
              alt="NeoDB logo"
              fill
              className="object-contain block dark:hidden"
            />

            <Image
              src="/widgets/neodb/neodb_light.svg"
              alt="NeoDB logo"
              fill
              className="object-contain hidden dark:block"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
