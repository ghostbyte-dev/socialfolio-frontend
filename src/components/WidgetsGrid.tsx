import { WidgetFactory } from "@/lib/WidgetFactory";
import { GitHubData, WidgetProps } from "@/types/widget-types";

const addNewWidget: WidgetProps = {
  id: "0",
  type: "newwidget",
  variant: 1,
  size: {cols: 3, rows: 1},
  data: {} as GitHubData
}

export default function WidgetsGrid({ widgets }: { widgets: WidgetProps[] }) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...widgets, addNewWidget].map((widget) => {
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
  