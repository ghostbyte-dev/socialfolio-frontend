import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type ICreateWidgetRequest,
  WidgetService,
} from "@/services/widget.service";
import type { WidgetProps } from "@/types/widget-types";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import WidgetTypeSelector from "./WidgetTypeSelector";
import WidgetPropsSelector from "./WidgetPropsSelector";
import { FocusTrap } from "focus-trap-react";
import { useAuth } from "@/context/AuthContext";
import { XIcon } from "lucide-react";

export interface WidgetOption {
  id: string;
  name: string;
  imageLink: string;
  imageLinkDarkTheme: string;
  fields: {
    key: string;
    label: string;
    type: string;
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

interface WidgetEditorProps {
  onClose: () => void;
}

export default function WidgetEditor({ onClose }: WidgetEditorProps) {
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

  const handleSave = (formData: any, variant: number) => {
    if (!selectedWidget) return;

    const widgetData = selectedWidget.fields.reduce((acc, field) => {
      acc[field.key] = formData[field.key] || "";
      return acc;
    }, {} as Record<string, string>);
    const createWidgetRequest: ICreateWidgetRequest = {
      type: selectedWidget.id,
      variant: variant,
      size: {
        cols: 1,
        rows: 1,
      },
      data: widgetData,
    };

    mutation.mutate({
      data: createWidgetRequest,
      jwt: token ?? "",
    });
  };

  return (
    <FocusTrap>
      <div
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="relative bg-surface-container w-[80%] h-[80%] rounded-2xl shadow-lg flex overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Sidebar - Widget Options */}
          {selectedWidget == null && (
            <div className="md:hidden w-full">
              <div className="w-full h-full">
                <WidgetTypeSelector
                  selectedWidget={selectedWidget}
                  handleSelectWidget={handleSelectWidget}
                />
              </div>
            </div>
          )}
          <div className="w-1/3 hidden md:block">
            <WidgetTypeSelector
              selectedWidget={selectedWidget}
              handleSelectWidget={handleSelectWidget}
            />
          </div>

          {/* Right Side - Widget Configuration */}
          {selectedWidget != null && (
            <div className="block md:hidden w-full">
              <div className="w-full h-full">
                <WidgetPropsSelector
                  selectedWidget={selectedWidget}
                  handleSave={handleSave}
                  goBack={() => setSelectedWidget(null)}
                />
              </div>
            </div>
          )}

          <div className="hidden md:block w-full h-full">
            <WidgetPropsSelector
              selectedWidget={selectedWidget}
              handleSave={handleSave}
              goBack={() => setSelectedWidget(null)}
            />
          </div>

          <button
            type="button"
            aria-label="Close widget creator"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault(); // Prevent scrolling when pressing space
                onClose();
              }
            }}
            className="top-4 right-4 absolute text-white bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
          >
            <XIcon size={18} />
          </button>
        </div>
      </div>
    </FocusTrap>
  );
}
