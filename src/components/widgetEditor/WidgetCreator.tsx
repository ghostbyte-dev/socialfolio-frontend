import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, XIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import {
  type ICreateWidgetRequest,
  WidgetService,
} from "@/services/widget.service";
import type { WidgetProps, WidgetSize } from "@/types/widget-types";
import WidgetPropsSelector from "./WidgetPropsSelector";
import WidgetTypeSelector from "./WidgetTypeSelector";

export interface WidgetOption {
  id: string;
  name: string;
  imageLink: string;
  imageLinkDarkTheme: string;
  fields: {
    key: string;
    label: string;
    type: "text" | "textArea" | "select" | "image" | "location" | "number";
    placeholder?: string | undefined;
    options?: string[] | undefined;
    defaultOption?: string | undefined;
  }[];
  variants: Variant[];
  sizes: Size[];
}

interface Size {
  cols: number;
  rows: number;
}

interface Variant {
  index: number;
}

interface WidgetCreatorProps {
  onClose: () => void;
}

export default function WidgetCreator({ onClose }: WidgetCreatorProps) {
  const params = useParams();
  const username = params.username as string;
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const [selectedWidget, setSelectedWidget] = useState<WidgetOption | null>(
    null,
  );

  const mutation = useMutation({
    mutationKey: ["new Widget"],
    mutationFn: ({
      data,
      jwt,
    }: {
      data: ICreateWidgetRequest;
      jwt: string;
    }) => {
      return toast.promise(WidgetService.createWidget(data, jwt), {
        loading: "Creating Widget...",
        success: "Successfully created Widget",
        error: (err) => `Error: ${err.message}`,
      });
    },
    onMutate: async ({
      data,
      jwt,
    }: {
      data: ICreateWidgetRequest;
      jwt: string;
    }) => {
      await queryClient.cancelQueries({
        queryKey: ["widgetsofuser", username],
      });

      const previousWidgets = queryClient.getQueryData([
        "widgetsofuser",
        username,
      ]);

      const newWidget: WidgetProps = {
        type: data.type,
        id: "",
        size: data.size,
        variant: data.variant,
        data: {},
      };

      queryClient.setQueryData(
        ["widgetsofuser", username],
        (old: WidgetProps[] | undefined) => [...(old ?? []), newWidget],
      );

      return { previousWidgets };
    },
    onSuccess: () => {
      onClose();
    },
    onError: (context: any) => {
      queryClient.setQueryData(
        ["widgetsofuser", username],
        context.previousWidgets,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["widgetsofuser", username] });
    },
  });

  const handleSelectWidget = (widget: WidgetOption) => {
    setSelectedWidget(widget);
    /* setFormData(
      widget.fields.reduce((acc, field) => {
        acc[field.key] = "";
        return acc;
      }, {} as Record<string, string>)
    ); */
  };

  const handleSave = (
    formData: any,
    variant: number,
    priority: number,
    size: WidgetSize,
  ) => {
    if (!selectedWidget) return;

    const widgetData = selectedWidget.fields.reduce(
      (acc, field) => {
        acc[field.key] = formData[field.key] || "";
        return acc;
      },
      {} as Record<string, string>,
    );
    const createWidgetRequest: ICreateWidgetRequest = {
      type: selectedWidget.id,
      variant: variant,
      size: size,
      priority: priority,
      data: widgetData,
    };

    mutation.mutate({
      data: createWidgetRequest,
      jwt: token ?? "",
    });
  };

  return (
    <div>
      <div className="p-3 mx-2 mt-2 rounded-xl relative flex justify-between">
        <div className="z-30">
          {selectedWidget != null && (
            <button
              type="button"
              aria-label="Close widget creator"
              onClick={() => setSelectedWidget(null)}
              className="z-30 text-on-primary bg-primary rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
          )}
        </div>

        <button
          type="button"
          aria-label="Close widget creator"
          onClick={onClose}
          className="z-30 text-white bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
        >
          <XIcon size={18} />
        </button>

        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center text-lg text-center font-bold">
          {selectedWidget ? selectedWidget.name : "Select a Widget"}
        </div>
      </div>

      <div className="h-full w-full overflow-y-scroll">
        {selectedWidget == null && (
          <WidgetTypeSelector
            selectedWidget={selectedWidget}
            handleSelectWidget={handleSelectWidget}
          />
        )}

        {selectedWidget != null && (
          <WidgetPropsSelector
            selectedWidget={selectedWidget}
            handleSave={handleSave}
            goBack={() => setSelectedWidget(null)}
          />
        )}
      </div>
    </div>
  );
}
