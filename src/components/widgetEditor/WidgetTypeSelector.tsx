import Image from "next/image";
import { widgetOptions } from "@/data/widgetOptions";
import type { WidgetOption } from "./WidgetCreator";

interface WidgetTypeSelectorProps {
  selectedWidget: WidgetOption | null;
  handleSelectWidget: (widget: WidgetOption) => void;
}

export default function WidgetTypeSelector({
  handleSelectWidget,
}: WidgetTypeSelectorProps) {
  return (
    <div className="w-full h-full p-4 border-r overflow-y-scroll">
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
        {widgetOptions.map((widget) => (
          <button
            key={widget.id}
            onClick={() => handleSelectWidget(widget)}
            type="button"
            className="flex flex-col justify-evenly items-center space-y-3 py-5 wrapper clickable"
          >
            <Image
              src={widget.imageLink}
              alt={widget.name}
              height={46}
              width={46}
              className="dark:hidden"
            />
            <Image
              src={widget.imageLinkDarkTheme}
              alt={widget.name}
              height={46}
              width={46}
              className="hidden dark:block"
            />
            <p className="font-bold">{widget.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
