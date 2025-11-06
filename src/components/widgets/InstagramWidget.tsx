import type { InstagramData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface InstagramWidgetProps {
  data: InstagramData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function InstagramWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: InstagramWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://instagram.com/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center  bg-gradient-to-tr from-[#ec0016] to-[#bb00ac]">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/instagram/instagram_logo.svg"
              alt="Instagram logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
