import type { GitlabData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface WidgetProps {
  data: GitlabData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function GitlabWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: WidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://${data.instance}/@${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#ffe500]">
          <div className="w-2/3 h-2/3 relative">
            <Image
              src="/widgets/loops/loopss_logo.png"
              alt="Gitlab logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
