import { widgetOptions } from "@/data/widgetOptions";
import { WidgetOption } from "./WidgetCreator";

interface WidgetTypeSelectorProps {
  selectedWidget: WidgetOption | null;
  handleSelectWidget: (widget: WidgetOption) => void;
}

export default function WidgetTypeSelector({
  selectedWidget,
  handleSelectWidget,
}: WidgetTypeSelectorProps) {
  return (
    <div className="w-full h-full bg-surface-container-high p-4 border-r overflow-y-scroll">
      <h2 className="text-lg font-bold mb-4">Select a Widget</h2>
      <ul>
        {widgetOptions.map((widget) => (
          <li
            key={widget.id}
            tabIndex={0}
            className={`p-3 flex items-center gap-3 cursor-pointer rounded-lg ${
              selectedWidget?.id === widget.id
                ? "bg-primary-container"
                : "hover:bg-primary-container"
            }`}
            onClick={() => handleSelectWidget(widget)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelectWidget(widget);
              }
            }}
          >
            <img
              src={widget.imageLink}
              alt={widget.name}
              className="w-8 h-8 dark:hidden"
            />
            <img
              src={widget.imageLinkDarkTheme}
              alt={widget.name}
              className="w-8 h-8 hidden dark:block"
            />
            <span>{widget.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
