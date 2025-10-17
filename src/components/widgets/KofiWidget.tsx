import type { KofiData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

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
          <img
            src="/widgets/kofi/support_me_on_kofi_badge_dark.png"
            alt="Ko-fi support me badge"
            className="w-[80%] h-[80%] object-contain"
          />
        </div>
      )}
      {variant === 2 && (
        <div className="h-full w-full flex justify-center items-center bg-[#72a4f2]">
          <img
            src="/widgets/kofi/support_me_on_kofi_badge_blue.png"
            alt="Ko-fi support me badge"
            className="w-[80%] h-[80%] object-contain"
          />
        </div>
      )}
      {variant === 3 && (
        <div className="h-full w-full flex justify-center items-center bg-[#f4efe7]">
          <img
            src="/widgets/kofi/support_me_on_kofi_badge_beige.png"
            alt="Ko-fi support me badge"
            className="w-[80%] h-[80%] object-contain"
          />
        </div>
      )}
      {variant === 4 && (
        <div className="h-full w-full flex justify-center items-center bg-[#ff5a16]">
          <img
            src="/widgets/kofi/support_me_on_kofi_badge_red.png"
            alt="Ko-fi support me badge"
            className="w-[80%] h-[80%] object-contain"
          />
        </div>
      )}
      {variant === 5 && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgeteditor/kofi.svg"
            alt="Ko-fi logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}
    </BaseWidget>
  );
}
