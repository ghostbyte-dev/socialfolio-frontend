import { StatsService } from "@/services/stats.service";
import { useQuery } from "@tanstack/react-query";
import { StatsWidget } from "../widgets/StatsWidget";

export default function StatsSection() {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: StatsService.getStats,
  });

  return (
    <section className="mt-40 w-full bg-primary text-on-primary py-16">
      <div className="container mx-auto flex flex-col items-center">
        {/* <div className="flex justify-center">
          <h2 className="text-4xl font-bold">Stats</h2>
        </div> */}

        <div className="flex w-full flex-wrap justify-center mt- md:mt-">
          <div className="w-56 h-56 m-10">
            <StatsWidget
              stat={stats?.userCount?.toString() ?? ""}
              name="Total profiles"
              variant={1}
            />
          </div>

          <div className="w-56 h-56 m-10">
            <StatsWidget
              stat={stats?.widgetCount?.toString() ?? ""}
              name="Total widgets"
              variant={1}
            />
          </div>

          {stats?.userCount && stats.widgetCount !== 0 ? (
            <div className="w-56 h-56 m-10">
              <StatsWidget
                stat={(stats?.widgetCount / stats.userCount).toFixed(2) ?? ""}
                name="Average widgets per profile"
                variant={1}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </section>
  );
}
