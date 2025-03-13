import { NoteWidgetData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import { useEffect, useState } from "react";

interface NoteWidgetProps {
  data: NoteWidgetData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function NoteWidget({
  data,
  size,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: NoteWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={false}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
    >
      {variant == 1 && (
        <div className="h-full w-full p-[10%] flex justify-center items-center">
          <p className="break-words max-w-full">{data.note}</p>
        </div>
      )}
      {variant >= 2 && variant <= 6 && (
        <NoteWidgetVariant2 data={data} variant={variant} />
      )}
    </BaseWidget>
  );
}

function NoteWidgetVariant2({
  data,
  variant,
}: {
  data: NoteWidgetData;
  variant: number;
}) {
  const [asciiNote, setAsciiNote] = useState("");

  useEffect(() => {
    async function loadFiglet() {
      const figlet = (await import("figlet")).default;

      let font: any;
      switch (variant) {
        case 2:
          // @ts-ignore
          font = (await import("figlet/importable-fonts/Standard.js")).default;
          break;
        case 3:
          // @ts-ignore
          font = (await import("figlet/importable-fonts/Slant.js")).default;
          break;
        case 4:
          // @ts-ignore
          font = (await import("figlet/importable-fonts/Univers.js")).default;
          break;
        case 5:
          // @ts-ignore
          font = (await import("figlet/importable-fonts/Star Wars.js")).default;
          break;
        case 6:
          // @ts-ignore
          font = (await import("figlet/importable-fonts/Tinker-Toy.js"))
            .default;
          break;
      }

      figlet.parseFont("Standard", font);

      figlet.text(data.note, { font: "Standard" }, (err, result) => {
        console.log(result);
        if (!err) setAsciiNote(result ?? "");
      });
    }

    if (data.note) {
      loadFiglet().catch(console.error);
    }
  }, [data.note]);

  return (
    <div className="h-full w-full p-[10%] flex justify-center items-center">
      <pre className="font-mono max-w-full overflow-hidden whitespace-wrap text-[4px] sm:text-[5px]">
        {asciiNote || "Loading..."}
      </pre>
    </div>
  );
}
