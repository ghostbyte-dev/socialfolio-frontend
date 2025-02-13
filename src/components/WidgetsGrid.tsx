import { getUserData } from "@/hooks/useUserData";
import { WidgetFactory } from "@/lib/WidgetFactory";
import { WidgetService } from "@/services/widget.service";
import { GitHubData, WidgetProps } from "@/types/widget-types";
import { useQuery } from "@tanstack/react-query";

const addNewWidget: WidgetProps = {
  id: "0",
  type: "newwidget",
  variant: 1,
  size: { cols: 3, rows: 1 },
  data: {} as GitHubData,
};

export default function WidgetsGrid({
  username,
  isOwner,
}: {
  username: string;
  isOwner: boolean;
}) {


  const {
    data: widgets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["widgetsofuser", username],
    queryFn: () => WidgetService.getUsersWidgets(username),
    enabled: !!username,
  });


  const displayedWidgets = isOwner ? [...widgets, addNewWidget] : widgets;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading widgets</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {displayedWidgets.map((widget) => {
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
