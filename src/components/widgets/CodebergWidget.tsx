import type { CodebergData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface CodebergWidgetProps {
  data: CodebergData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function CodebergWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: CodebergWidgetProps) {
  const getBackground = () => {
    switch (variant) {
      case 1:
        return "#2185D0";
      case 2:
        return "#73CCC6";
      case 3:
        return "#0B3049";
      case 4:
        return "#144B49";
      default:
        return "";
    }
  };
  const background = "bg-[" + getBackground() + "]";
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://codeberg.org/${data.username}`}
    >
      {(variant === 1 || variant === 2 || variant === 3 || variant === 4) && (
        <div
          className={"h-full w-full flex justify-center items-center"}
          style={{ backgroundColor: getBackground() }}
        >
          <img
            src="/widgets/codeberg/codeberg.svg"
            alt="Codeberg logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}
      {variant === 5 && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgeteditor/codeberg.svg"
            alt="Codeberg logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}
      {variant === 6 && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgets/codeberg/codeberg_black.svg"
            alt="Codeberg logo"
            className="w-[50%] h-[50%] object-contain block dark:hidden"
          />
          <img
            src="/widgets/codeberg/codeberg.svg"
            alt="Codeberg logo"
            className="w-[50%] h-[50%] object-contain hidden dark:block"
          />
        </div>
      )}
    </BaseWidget>
  );
}
