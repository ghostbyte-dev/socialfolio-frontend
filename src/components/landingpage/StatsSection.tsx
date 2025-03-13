import { StatsService } from "@/services/stats.service";
import { useQuery } from "@tanstack/react-query";
import { StatsWidget } from "../widgets/StatsWidget";
import { WidgetFactory } from "@/lib/WidgetFactory";

export default function StatsSection() {
  const {
    data: stats,
    isPending,
    error,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: StatsService.getStats,
  });

  const getDefaultWidgetData = (type: string, variant: number) => {
    switch (type) {
      case "github":
        return { username: "Hiebeler" };
      case "mastodon":
        return { instance: "https://techhub.social", username: "socialfolio" };
      case "note":
        return { text: "This is a sample note." };
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

        {stats?.userCount && stats.widgetCount != 0 && (
          <div className="w-56 h-56 m-10 rotate-[7deg]">
            <StatsWidget
              stat={(stats?.widgetCount / stats.userCount).toFixed(2) ?? ""}
              name="Average widgets per profile"
              variant={3}
            />
          </div>
        )}
      </div>

      {stats && (
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
                    stats.mostUsedWidgets[2].mostUsedVariant
                  ),
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
                    stats.mostUsedWidgets[0].mostUsedVariant
                  ),
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
                    stats.mostUsedWidgets[1].mostUsedVariant
                  ),
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
      )}
    </section>
  );
}
