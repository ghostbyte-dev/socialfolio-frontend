import { StatsService, type WidgetStats } from "@/services/stats.service";
import { useQuery } from "@tanstack/react-query";
import { WidgetFactory } from "@/lib/WidgetFactory";
import type { WidgetData } from "@/types/widget-types";

export default function WidgetsSection() {
  const { data: widgetStats } = useQuery({
    queryKey: ["widgetStats"],
    queryFn: StatsService.getWidgetStats,
  });

  const getDefaultWidgetData = (type: string) => {
    switch (type) {
      case "github":
        return { username: "Hiebeler" };
      case "mastodon":
        return { instance: "https://techhub.social", username: "socialfolio" };
      case "note":
        return { note: "Note widget" };
      case "link":
        return { link: "https://example.com", label: "example.com" };
      case "country":
        return { countryName: "Austria" };
      case "image":
        return {
          image: "https://picsum.photos/400",
        };
      case "email":
        return { email: "default@example.com" }; // Default email
      case "location":
        return { lon: "39.2", lat: "-6.17", zoom: 9 };
      case "weather":
        return { lon: "39.2", lat: "-6.17" };
      default:
        return {};
    }
  };

  return (
    <section className="mt-20 content-wrapper flex flex-col items-center">
      <div className="flex justify-center mt-10">
        <h2 className="text-5xl font-bold">Widgets</h2>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-flow-row-dense w-full mt-10"
        style={{
          gridAutoRows: "minmax(50px, 1fr)",
        }}
      >
        {widgetStats?.map((widget: WidgetStats) => {
          const cols = Math.random() > 0.8 ? 2 : 1;
          const rows = Math.random() > 0.8 ? 2 : 1;
          const aspectRatio = rows / cols; // Calculate aspect ratio (height/width)
          return (
            <div
              key={widget.type}
              className={`relative w-full`}
              style={{
                gridRow: `span ${rows}`,
                gridColumn: `span ${cols}`,
                paddingBottom: `${aspectRatio * 100}%`, // Maintain aspect ratio
              }}
            >
              <div className="absolute inset-0 group">
                <WidgetFactory
                  widget={{
                    type: widget.type,
                    id: "1",
                    size: { cols: 1, rows: 2 },
                    data: getDefaultWidgetData(widget.type) as WidgetData,
                    variant: 1,
                  }}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                  preview={true}
                />
                <div className="absolute inset-0 bg-black/30 rounded-4xl flex items-center justify-center opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:backdrop-blur-md">
                  <p className="text-white text-lg font-semibold">
                    Used {widget.count} times
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
