"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { widgetCategories } from "@/data/widgetOptions";
import { WidgetService } from "@/services/widget.service";
import type { WidgetProps, WidgetSize } from "@/types/widget-types";
import WidgetPropsSelector from "./WidgetPropsSelector";

interface WidgetEditorProps {
  widgetProps: WidgetProps;
  onClose: () => void;
}

export default function WidgetEditor({
  widgetProps,
  onClose,
}: WidgetEditorProps) {
  const { token } = useAuth();
  const params = useParams();
  const username = params.username as string;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["edit Widget"],
    mutationFn: ({ data, jwt }: { data: WidgetProps; jwt: string }) => {
      return toast.promise(WidgetService.updateWidget(data, jwt), {
        loading: "Updating Widget...",
        success: "Successfully updated Widget",
        error: (err) => `Error: ${err.message}`,
      });
    },
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: ["widgetsofuser", username],
      });

      const previousWidgets = queryClient.getQueryData([
        "widgetsofuser",
        username,
      ]);

      // Optimistically update the list
      queryClient.setQueryData(
        ["widgetsofuser", username],
        (old: WidgetProps[] | undefined) =>
          old?.map((w) => (w.id === data.id ? data : w)) ?? [],
      );

      return { previousWidgets };
    },
    onSuccess: () => {
      onClose();
    },
    onError: (err, variables, context: any) => {
      queryClient.setQueryData(
        ["widgetsofuser", username],
        context?.previousWidgets,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["widgetsofuser", username] });
    },
  });

  const handleSave = (formData: any, variant: number, size: WidgetSize) => {
    // Construct the final widget object to save
    const updatedWidget: WidgetProps = {
      ...widgetProps, // Keep ID and type
      data: formData,
      variant,
      size,
    };

    mutation.mutate({ data: updatedWidget, jwt: token ?? "" });
  };

  if (!widgetProps) return null;

  // Find the widget configuration based on the type
  const selectedWidget = widgetCategories
    .flatMap((category) => category.widgets)
    .find((widgetOption) => widgetOption.id === widgetProps.type);

  if (!selectedWidget) {
    return (
      <div className="p-10 relative">
        <p className="text-red-500">Widget configuration not found.</p>
        <button
          type="button"
          onClick={onClose}
          className="top-4 right-4 absolute text-white bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
        >
          <XIcon size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col bg-surface overflow-hidden">
      {/* Header */}
      <div className="px-10 py-5 border-b border-border flex justify-between items-center">
        <h2 className="text-xl font-bold">Edit {selectedWidget.name}</h2>
        <button
          type="button"
          aria-label="Close edit widget menu"
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <XIcon size={24} />
        </button>
      </div>

      {/* Reusable Selector handles the form and preview */}
      <WidgetPropsSelector
        selectedWidget={selectedWidget}
        initialData={widgetProps}
        handleSave={handleSave}
        goBack={onClose}
      />
    </div>
  );
}
