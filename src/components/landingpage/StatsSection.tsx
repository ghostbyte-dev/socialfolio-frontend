import { StatsService } from "@/services/stats.service";
import { useQuery } from "@tanstack/react-query";
import { StatsWidget } from "../widgets/StatsWidget";

export default function StatsSection() {
  const {
    data: stats,
    isPending,
    error,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: StatsService.getStats,
  });

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

      <div></div>
    </section>
  );
}
