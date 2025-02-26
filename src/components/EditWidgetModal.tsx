import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WidgetService } from "@/services/widget.service";
import { useSession } from "next-auth/react";
import { WidgetProps, WidgetSize } from "@/types/widget-types";
import { useParams } from "next/navigation";
import { widgetOptions } from "./WidgetEditor";
import { WidgetsGridDisplay } from "./WidgetsGrid";
import Close from "@/assets/icons/close.svg";

interface WidgetEditorProps {
  widgetProps: WidgetProps;
  onClose: () => void;
}

export default function EditWidgetModal({
  widgetProps,
  onClose,
}: WidgetEditorProps) {
  const [widgetData, setWidgetData] = useState<WidgetProps>({ ...widgetProps });
  const { data: session } = useSession();
  const params = useParams();
  const username = params.username as string;
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    return Object.entries(widgetData.data || {}).reduce((acc, [key, value]) => {
      if (typeof value === "string") {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);
  });
  const [variant, setVariant] = useState<number>(widgetData.variant);
  const [selectedSize, setSelectedSize] = useState<WidgetSize>(widgetData.size);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    widgetData.data = {
      ...widgetData.data,
      [key]: value,
    };
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    mutation.mutate({ data: widgetData, jwt: session?.user.jwt ?? "" });
  };
  const selectedWidget = widgetOptions.find(
    (widgetOption) => widgetOption.id == widgetData.type
  );

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [cols, rows] = e.target.value.split("x").map(Number);
    const size: WidgetSize = { cols, rows };
    widgetData.size = size;
    setSelectedSize(size);
  };

  const mutation = useMutation({
    mutationKey: ["edit Widget"],
    mutationFn: ({ data, jwt }: { data: WidgetProps; jwt: string }) => {
      return WidgetService.updateWidget(data, jwt);
    },
    onMutate: async ({ data, jwt }: { data: WidgetProps; jwt: string }) => {
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
    onSuccess: () => setMessage("Widget saved successfully!"),
    onError: (context: any) => {
      alert(context.message);
      setMessage("Failed to save widget.");
      queryClient.setQueryData(
        ["widgetsofuser", username],
        context.previousWidgets
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["widgetsofuser", username] });
    },
  });

  return (
    <div
      className="fixed inset-0 flex justify-center items-center"
      onClick={() => onClose()}
    >
      <div
        className="relative bg-surface-container w-[80%] h-[80%] rounded-2xl shadow-lg flex overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 p-8">
          <h2 className="text-xl font-bold">Widget Editor</h2>
          {selectedWidget ? (
            <div className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Variant
                </label>
                <select
                  className="w-full p-2 border rounded-sm"
                  value={variant}
                  onChange={(e) => {
                    setVariant(Number(e.target.value));
                    widgetData.variant = Number(e.target.value);
                  }}
                >
                  {selectedWidget.variants.map((variant) => (
                    <option key={variant.index} value={variant.index}>
                      Variant {variant.index}
                    </option>
                  ))}
                </select>
              </div>
              {selectedWidget.fields.map((field) => (
                <div key={field.key} className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      className="w-full p-2 border rounded-sm"
                      value={formData[field.key] || field.defaultOption}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    >
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      className="w-full p-2 border rounded-sm"
                      value={formData[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />
                  )}
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Size
                </label>
                <select
                  className="w-full p-2 border rounded-sm"
                  value={`${selectedSize.cols}x${selectedSize.rows}`}
                  onChange={handleSizeChange}
                >
                  {selectedWidget.sizes.map((size, index) => (
                    <option key={index} value={`${size.cols}x${size.rows}`}>
                      {size.cols}x{size.rows}
                    </option>
                  ))}
                </select>
              </div>

              <WidgetsGridDisplay
                isOwner={false}
                widgets={[widgetData]}
                deleteWidget={() => {}}
              />

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-sm disabled:opacity-50"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Save Widget"}
              </button>

              {/* Success / Error Message */}
              {message && <p className="mt-2 text-sm text-center">{message}</p>}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">Select a widget to configure.</p>
          )}

          {/* Success / Error Message */}
          {message && <p className="mt-2 text-sm text-center">{message}</p>}
        </div>

        {/* Close Button */}
        <div
          onClick={onClose}
          className="top-4 right-4 absolute bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
        >
          <Close className="w-[10px] h-[10px]" />
        </div>
      </div>
    </div>
  );
}
