import { StatsService, WidgetStats } from "@/services/stats.service";
import { useQuery } from "@tanstack/react-query";
import { StatsWidget } from "../widgets/StatsWidget";
import { WidgetFactory } from "@/lib/WidgetFactory";
import { WidgetData } from "@/types/widget-types";

export default function StatsSection() {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: StatsService.getStats,
  });

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
    <section className="mt-20 mx-auto flex flex-col items-center">
      <div className="flex justify-center">
        <h2 className="text-4xl font-bold">Stats</h2>
      </div>

      <div className="flex w-full flex-wrap justify-center mt-10 md:mt-14">
        <div className="w-56 h-56 m-10 rotate-[3deg]">
          <StatsWidget
            stat={stats?.userCount?.toString() ?? ""}
            name="Total profiles"
            variant={1}
          />
        </div>

        <div className="w-56 h-56 m-10 rotate-[-3deg]">
          <StatsWidget
            stat={stats?.widgetCount?.toString() ?? ""}
            name="Total widgets"
            variant={2}
          />
        </div>

        {(stats?.userCount && stats.widgetCount !== 0)
          ? (
            <div className="w-56 h-56 m-10 rotate-[7deg]">
              <StatsWidget
                stat={(stats?.widgetCount / stats.userCount).toFixed(2) ?? ""}
                name="Average widgets per profile"
                variant={3}
              />
            </div>
          )
          : <div></div>}
      </div>

      <div className="flex justify-center mt-10">
        <h2 className="text-4xl font-bold">Widgets</h2>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-flow-row-dense w-full mt-10 px-4"
        style={{
          gridAutoRows: "minmax(50px, 1fr)", // Adjust the minimum row height as needed
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
                    data: getDefaultWidgetData(
                      widget.type,
                    ) as WidgetData,
                    variant: 1,
                  }}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                  preview={true}
                />
                <div className="absolute inset-0 bg-black/70 rounded-4xl flex items-center justify-center 
               opacity-0 scale-95 transition-all duration-300 ease-out 
               group-hover:opacity-100 group-hover:scale-100">
                  <p className="text-white text-lg font-semibold">
                    used {widget.count} times
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {
        /*{stats && stats.mostUsedWidgets.length >= 2
        ? (
          <div>
            <div className="flex justify-center mt-10 mb-10">
              <h2 className="text-4xl font-bold">Most used widgets</h2>
            </div>
            <div className="flex w-full flex-wrap justify-center mt-10 md:mt-14">
              <div className="w-56 h-56 m-10 rotate-[-2deg] mt-20">
                <WidgetFactory
                  widget={{
                    type: stats?.mostUsedWidgets[2].type ?? "note",
                    id: "1",
                    size: { cols: 1, rows: 1 },
                    data: getDefaultWidgetData(
                      stats.mostUsedWidgets[2].type,
                    ) as WidgetData,
                    variant: stats.mostUsedWidgets[2].mostUsedVariant,
                  }}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                  preview={true}
                />
              </div>
              <div className="w-56 h-56 m-10 rotate-[1deg]">
                <WidgetFactory
                  widget={{
                    type: stats?.mostUsedWidgets[0].type ?? "note",
                    id: "1",
                    size: { cols: 1, rows: 1 },
                    data: getDefaultWidgetData(
                      stats.mostUsedWidgets[0].type,
                    ) as WidgetData,
                    variant: stats.mostUsedWidgets[0].mostUsedVariant,
                  }}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                  preview={true}
                />
              </div>
              <div className="w-56 h-56 m-10 rotate-[4deg] mt-20">
                <WidgetFactory
                  widget={{
                    type: stats?.mostUsedWidgets[1].type ?? "note",
                    id: "1",
                    size: { cols: 1, rows: 1 },
                    data: getDefaultWidgetData(
                      stats.mostUsedWidgets[1].type,
                    ) as WidgetData,
                    variant: stats.mostUsedWidgets[1].mostUsedVariant,
                  }}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                  preview={true}
                />
              </div>
            </div>
          </div>
        )
        : <div></div>}*/
      }
    </section>
  );
}
