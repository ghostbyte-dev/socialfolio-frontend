import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateWidgetRequest, WidgetService } from "@/services/widget.service";
import { useSession } from "next-auth/react";
import { WidgetProps } from "@/types/widget-types";
import { useParams } from "next/navigation";
import Close from "@/assets/icons/close.svg";
import toast from "react-hot-toast";
import { widgetOptions } from "@/data/widgetOptions";
import WidgetTypeSelector from "./WidgetTypeSelector";
import WidgetPropsSelector from "./WidgetPropsSelector";

export interface WidgetOption {
  id: string;
  name: string;
  imageLink: string;
  imageLinkDarkTheme: string;
  fields: {
    key: string;
    label: string;
    type: string;
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

  const { data: session } = useSession();

  const [selectedWidget, setSelectedWidget] = useState<WidgetOption | null>(
    null
  );
  const [variant, setVariant] = useState<number>(1);

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
        (old: WidgetProps[] | undefined) => [...(old ?? []), newWidget]
      );

      return { previousWidgets };
    },
    onSuccess: () => {
      onClose();
    },
    onError: (context: any) => {
      queryClient.setQueryData(
        ["widgetsofuser", username],
        context.previousWidgets
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["widgetsofuser", username] });
    },
  });

  const handleSelectWidget = (widget: WidgetOption) => {
    setVariant(1);
    setSelectedWidget(widget);
    /* setFormData(
      widget.fields.reduce((acc, field) => {
        acc[field.key] = "";
        return acc;
      }, {} as Record<string, string>)
    ); */
  };

  const handleSave = (formData: any) => {
    if (!selectedWidget) return;

    // Create data object dynamically based on user input
    const widgetData = selectedWidget.fields.reduce((acc, field) => {
      acc[field.key] = formData[field.key] || ""; // Use user input or default to empty string
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
      jwt: session?.user.jwt ?? "",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="relative bg-surface-container w-[80%] h-[80%] rounded-2xl shadow-lg flex overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar - Widget Options */}

        <div className="md:hidden">
          {selectedWidget == null && (
            <div className="w-full h-full">
              <WidgetTypeSelector
                selectedWidget={selectedWidget}
                handleSelectWidget={handleSelectWidget}
              />
            </div>
          )}
        </div>

        <div className="w-1/3 hidden md:block">
          <WidgetTypeSelector
            selectedWidget={selectedWidget}
            handleSelectWidget={handleSelectWidget}
          />
        </div>

        {/* Right Side - Widget Configuration */}

        <div className="md:hidden">
          {selectedWidget != null && (
            <div className="w-full h-full">
              <WidgetPropsSelector
                selectedWidget={selectedWidget}
                handleSave={handleSave}
                goBack={() => setSelectedWidget(null)}
              />
            </div>
          )}
        </div>

        <div className="hidden md:block w-full h-full">
          <WidgetPropsSelector
            selectedWidget={selectedWidget}
            handleSave={handleSave}
            goBack={() => setSelectedWidget(null)}
          />
        </div>

        <div
          onClick={onClose}
          className="top-4 right-4 absolute bg-red-500 rounded-full w-8 h-8 flex justify-center items-center duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
        >
          <Close className="w-[10px] h-[10px] text-white" />
        </div>
      </div>
    </div>
  );
}
