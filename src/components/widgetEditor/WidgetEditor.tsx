import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WidgetService } from "@/services/widget.service";
import type { WidgetProps, WidgetSize } from "@/types/widget-types";
import { useParams } from "next/navigation";
import { WidgetsGridDisplay } from "../WidgetsGrid";
import toast from "react-hot-toast";
import SubmitButton from "../SubmitButton";
import { widgetOptions } from "@/data/widgetOptions";
import { FocusTrap } from "focus-trap-react";
import { useAuth } from "@/context/AuthContext";
import { XIcon } from "lucide-react";

interface WidgetEditorProps {
  widgetProps: WidgetProps;
  onClose: () => void;
}

export default function EditWidgetModal({
  widgetProps,
  onClose,
}: WidgetEditorProps) {
  const [widgetData, setWidgetData] = useState<WidgetProps>({ ...widgetProps });
  const { token } = useAuth();
  const params = useParams();
  const username = params.username as string;
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    return Object.entries(widgetData.data || {}).reduce((acc, [key, value]) => {
      if (typeof value === "string" || typeof value === "number") {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);
  });
  const [variant, setVariant] = useState<number>(widgetData.variant);
  const [selectedSize, setSelectedSize] = useState<WidgetSize>(widgetData.size);
  const [priority, setPriority] = useState<number>(widgetData.priority ?? 1);

  const handleChange = (key: string, value: string, type: string) => {
    if (type == "number") {
      widgetData.data = {
        ...widgetData.data,
        [key]: Number(value),
      };
      setFormData((prev) => ({ ...prev, [key]: Number(value) }));
    } else {
      widgetData.data = {
        ...widgetData.data,
        [key]: value,
      };
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSave = () => {
    mutation.mutate({ data: widgetData, jwt: token ?? "" });
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
      return toast.promise(WidgetService.updateWidget(data, jwt), {
        loading: "Updating Widget...",
        success: "Successfully updated Widget",
        error: (err) => `Error: ${err.message}`,
      });
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
        priority: data.priority,
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

  if (!selectedWidget) {
    return (
      <div
        className="fixed inset-0 flex justify-center items-center bg-black/50"
        onClick={() => onClose()}
      >
        <div
          className="relative bg-surface-container w-[80%] h-[80%] rounded-2xl shadow-lg flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <p>An error occured</p>
          <button
            aria-label="Close edit widget menu"
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
    );
  }

  return (
    <FocusTrap>
      <div
        className="fixed inset-0 flex justify-center items-center bg-black/50"
        onClick={() => onClose()}
      >
        <div
          className="relative bg-surface-container w-[80%] h-[80%] rounded-2xl shadow-lg flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="basis-full flex flex-col overflow-y-scroll px-10 py-5">
            <h2 className="text-xl font-bold">Widget Editor</h2>
            <div className="mt-4">
              <div className="mb-4">
                <label className="block font-medium mb-2">Variant</label>
                <select
                  className="input bg-surface-container-high w-full"
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
                  {field.type === "image" ? (
                    <></>
                  ) : field.type === "location" ? (
                    <></>
                  ) : (
                    <>
                      <label className="block font-medium mb-2">
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <select
                          className="input bg-surface-container-high w-full"
                          value={formData[field.key] || field.defaultOption}
                          onChange={(e) =>
                            handleChange(field.key, e.target.value, field.type)
                          }
                        >
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type == "textArea" ? (
                        <textarea
                          className="input bg-surface-container-high w-full"
                          value={formData[field.key]}
                          onChange={(e) =>
                            handleChange(field.key, e.target.value, field.type)
                          }
                        ></textarea>
                      ) : (
                        <input
                          type={field.type}
                          className="input bg-surface-container-high w-full"
                          value={formData[field.key]}
                          placeholder={field.placeholder}
                          onChange={(e) =>
                            handleChange(field.key, e.target.value, field.type)
                          }
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
              <div className="mb-4">
                <label className="block font-medium mb-2">Size</label>
                <select
                  className="input bg-surface-container-high w-full"
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
              <div className="mb-4">
                <label className="block font-medium mb-2">Priority</label>
                <input
                  className="input bg-surface-container-high w-full"
                  type="number"
                  value={priority}
                  onChange={(e) => {
                    setPriority(Number(e.target.value));
                    widgetData.priority = Number(e.target.value);
                  }}
                />
              </div>

              <WidgetsGridDisplay
                isOwner={false}
                widgets={[widgetData]}
                deleteWidget={() => {}}
              />
            </div>
          </div>
          <div className="bg-surface-container-high w-full rounded-b-2xl px-10 py-2 flex-row flex gap-2">
            <div className="basis-full"></div>
            <SubmitButton
              text="Cancel"
              onClick={onClose}
              isOutlined={true}
              isFullWidth={false}
            />
            <SubmitButton
              text="Save"
              isLoading={mutation.isPending}
              onClick={handleSave}
              isFullWidth={false}
            />
          </div>

          <button
            type="button"
            aria-label="Close edit widget menu"
            onClick={onClose}
            className="top-4 right-4 absolute text-white bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
          >
            <XIcon size={18} />
          </button>
        </div>
      </div>
    </FocusTrap>
  );
}
