import { WidgetFactory } from "@/lib/WidgetFactory";
import { WidgetProps } from "@/types/widget-types";

export default function WidgetsGrid({ widgets }: { widgets: WidgetProps[] }) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {widgets.map((widget) => {
          const aspectRatio = widget.size.rows / widget.size.cols; // Calculate aspect ratio (height/width)
          return (
            <div
              key={widget.id}
              className="relative w-full"
              style={{
                gridColumn: `span ${widget.size.cols}`,
                paddingBottom: `${aspectRatio * 100}%`, // Maintain aspect ratio
              }}
            >
              <div className="absolute inset-0">
                <WidgetFactory widget={widget} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  