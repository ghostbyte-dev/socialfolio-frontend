import type { LinkedinData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface LinkedinWidgetProps {
  data: LinkedinData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function LinkedinWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: LinkedinWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://linkedin.com/in/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#0177b5]">
          <div className="w-2/3 h-2/3 relative">
            <Image
              src="/widgets/linkedin/linkedin-icon.svg"
              alt="Linkedin logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
