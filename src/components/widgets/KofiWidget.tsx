import type { KofiData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface KofiWidgetProps {
  data: KofiData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function KofiWidget({
  data,
  variant,
  isOwner,
  deleteWidget,
  editWidget,
}: KofiWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://ko-fi.com/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#202020]">
          <div className="w-4/5 h-4/5 relative">
            <Image
              src="/widgets/kofi/support_me_on_kofi_badge_dark.png"
              alt="Ko-fi support me badge"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      {variant === 2 && (
        <div className="h-full w-full flex justify-center items-center bg-[#72a4f2]">
          <div className="w-4/5 h-4/5 relative">
            <Image
              src="/widgets/kofi/support_me_on_kofi_badge_blue.png"
              alt="Ko-fi support me badge"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      {variant === 3 && (
        <div className="h-full w-full flex justify-center items-center bg-[#f4efe7]">
          <div className="w-4/5 h-4/5 relative">
            <Image
              src="/widgets/kofi/support_me_on_kofi_badge_beige.png"
              alt="Ko-fi support me badge"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      {variant === 4 && (
        <div className="h-full w-full flex justify-center items-center bg-[#ff5a16]">
          <div className="w-4/5 h-4/5 relative">
            <Image
              src="/widgets/kofi/support_me_on_kofi_badge_red.png"
              alt="Ko-fi support me badge"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      {variant === 5 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgeteditor/kofi.svg"
              alt="Ko-fi logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
