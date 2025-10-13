import { WidgetFactory } from "@/lib/WidgetFactory";
import { WidgetService } from "@/services/widget.service";
import type { GitHubData, WidgetProps } from "@/types/widget-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import EditWidgetModal from "./widgetEditor/WidgetEditor";

const addNewWidget: WidgetProps = {
  id: "0",
  type: "newwidget",
  variant: 1,
  size: { cols: 1, rows: 1 },
  data: {} as GitHubData,
};

export default function WidgetsGrid({
  username,
  isOwner,
}: {
  username: string;
  isOwner: boolean;
}) {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const sessionStatus = status ?? "loading";

  const {
    data: widgets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["widgetsofuser", username],
    queryFn: () =>
      WidgetService.getUsersWidgets(username, session?.user?.jwt ?? ""),
    enabled: !!username && sessionStatus !== "loading",
  });

  const deleteWidget = useMutation({
    mutationFn: (id: string) =>
      WidgetService.deleteWidget(id, session?.user.jwt ?? ""),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["widgetsofuser", username],
      });

      const previousWidgets = queryClient.getQueryData([
        "widgetsofuser",
        username,
      ]);

      queryClient.setQueryData(
        ["widgetsofuser", username],
        (old: WidgetProps[]) => old.filter((widget) => widget.id !== id)
      );

      return { previousWidgets };
    },
    onError: (_err, _id: string, context: any) => {
      queryClient.setQueryData(
        ["widgetsofuser", username],
        context.previousWidgets
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["widgetsofuser", username] });
    },
  });

  const displayedWidgets = isOwner ? [...widgets, addNewWidget] : widgets;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading widgets</div>;
  }

  return (
    <WidgetsGridDisplay
      isOwner={isOwner}
      widgets={displayedWidgets}
      deleteWidget={(id: string) => deleteWidget.mutate(id)}
    />
  );
}

export function WidgetsGridDisplay({
  isOwner,
  widgets,
  deleteWidget,
  preview = false,
}: {
  isOwner: boolean;
  widgets: WidgetProps[];
  deleteWidget: (id: string) => void;
  preview?: boolean;
}) {
  const [editModal, setEditModal] = useState<WidgetProps | undefined>(
    undefined
  );

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-flow-row-dense"
      style={{
        gridAutoRows: "minmax(50px, 1fr)", // Adjust the minimum row height as needed
      }}
    >
      {widgets.map((widget) => {
        const aspectRatio = widget.size.rows / widget.size.cols; // Calculate aspect ratio (height/width)
        return (
          <div
            key={widget.id}
            className="relative w-full"
            style={{
              gridRow: `span ${widget.size.rows}`,
              gridColumn: `span ${widget.size.cols}`,
              paddingBottom: `${aspectRatio * 100}%`, // Maintain aspect ratio
            }}
          >
            <div className="absolute inset-0">
              <WidgetFactory
                widget={widget}
                isOwner={isOwner}
                deleteWidget={() => deleteWidget(widget.id)}
                editWidget={() => setEditModal(widget)}
                preview={preview}
              />
            </div>
          </div>
        );
      })}

      {editModal && isOwner ? (
        <EditWidgetModal
          widgetProps={editModal}
          onClose={() => setEditModal(undefined)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
