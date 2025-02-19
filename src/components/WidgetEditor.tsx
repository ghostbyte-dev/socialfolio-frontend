import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateWidgetRequest, WidgetService } from "@/services/widget.service";
import { useSession } from "next-auth/react";
import { WidgetProps } from "@/types/widget-types";
import { useParams } from "next/navigation";

interface WidgetOption {
  id: string;
  name: string;
  imageLink: string;
  fields: {
    key: string;
    label: string;
    type: string;
    options?: string[] | undefined;
    defaultOption?: string | undefined
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

export const widgetOptions: WidgetOption[] = [
  {
    id: "pixelfed",
    name: "Pixelfed",
    imageLink: "/widgeteditor/pixelfed.webp",
    fields: [
      { key: "instance", label: "Instance", type: "text" },
      { key: "username", label: "Username", type: "text" },
    ],
    variants: [{ index: 1 }],
    sizes: [
      { cols: 1, rows: 1 },
      { cols: 1, rows: 2 },
      { cols: 2, rows: 1 },
      { cols: 2, rows: 2 },
    ],
  },
  {
    id: "github",
    name: "GitHub",
    imageLink: "/widgeteditor/github.webp",
    fields: [{ key: "username", label: "Username", type: "text" }],
    variants: [{ index: 1 }, { index: 2 }, {index: 3}],
    sizes: [
      { cols: 1, rows: 1 },
      { cols: 1, rows: 2 },
      { cols: 2, rows: 1 },
      { cols: 2, rows: 2 },
    ],
  },
  {
    id: "mastodon",
    name: "Mastodon",
    imageLink: "/widgeteditor/mastodon.svg",
    fields: [
      { key: "instance", label: "Instance", type: "text" },
      { key: "username", label: "Username", type: "text" },
    ],
    variants: [{ index: 1 }, { index: 2 }, { index: 3 }],
    sizes: [
      { cols: 1, rows: 1 },
      { cols: 1, rows: 2 },
      { cols: 2, rows: 1 },
      { cols: 2, rows: 2 },
    ],
  },
  {
    id: "note",
    name: "Note",
    imageLink: "/widgeteditor/note.svg",
    fields: [{ key: "note", label: "Note", type: "text" }],
    variants: [{ index: 1 }],
    sizes: [
      { cols: 1, rows: 1 },
      { cols: 1, rows: 2 },
      { cols: 2, rows: 1 },
      { cols: 2, rows: 2 },
    ],
  },
  {
    id: "localTime",
    name: "Local Time",
    imageLink: "/widgeteditor/timezone.svg",
    fields: [
      {
        key: "timezone",
        label: "Timezone",
        type: "select",
        options: Intl.supportedValuesOf("timeZone"),
        defaultOption: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    ],
    variants: [{ index: 1 }],
    sizes: [
      { cols: 1, rows: 1 },
      { cols: 1, rows: 2 },
      { cols: 2, rows: 1 },
      { cols: 2, rows: 2 },
    ],
  },
];

export default function WidgetEditor({ onClose }: WidgetEditorProps) {
  const params = useParams();
  const username = params.username as string;
  const queryClient = useQueryClient();

  const { data: session } = useSession();

  const [selectedWidget, setSelectedWidget] = useState<WidgetOption | null>(
    null
  );
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [variant, setVariant] = useState<number>(1);
  const [message, setMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationKey: ["new Widget"],
    mutationFn: ({
      data,
      jwt,
    }: {
      data: ICreateWidgetRequest;
      jwt: string;
    }) => {
      return WidgetService.createWidget(data, jwt);
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
        (old: WidgetProps[]) => [...old, newWidget]
      );

      return { previousWidgets };
    },
    onSuccess: () => setMessage("Widget saved successfully!"),
    onError: (context: any) => {
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

  const handleSelectWidget = (widget: WidgetOption) => {
    setSelectedWidget(widget);
    setMessage(null);
    setFormData(
      widget.fields.reduce((acc, field) => {
        acc[field.key] = "";
        return acc;
      }, {} as Record<string, string>)
    );
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
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

  useEffect(() => {
    if (!selectedWidget) return;
    selectedWidget.fields.forEach((field) => {
      if (field.type === "select" && field.defaultOption) {
        handleChange(field.key, field.defaultOption);
      }
    });
  }, [selectedWidget]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="relative bg-white w-[80%] h-[80%] rounded-2xl shadow-lg flex overflow-hidden">
        {/* Left Sidebar - Widget Options */}
        <div className="w-1/3 bg-gray-100 p-4 border-r">
          <h2 className="text-lg font-bold mb-4">Select a Widget</h2>
          <ul>
            {widgetOptions.map((widget) => (
              <li
                key={widget.id}
                className={`p-3 flex items-center gap-3 cursor-pointer rounded-lg ${
                  selectedWidget?.id === widget.id
                    ? "bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleSelectWidget(widget)}
              >
                <img
                  src={widget.imageLink}
                  alt={widget.name}
                  className="w-8 h-8"
                />
                <span>{widget.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Widget Configuration */}
        <div className="flex-1 p-8">
          <h2 className="text-xl font-bold">Widget Editor</h2>
          {selectedWidget ? (
            <div className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Variant
                </label>
                <select
                  className="w-full input p-2 border rounded-sm"
                  value={variant}
                  onChange={(e) => setVariant(Number(e.target.value))}
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
                      className="w-full input p-2 border rounded-sm"
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
                      className="w-full p-2 input rounded-sm"
                      value={formData[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />
                  )}
                </div>
              ))}

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
        </div>

        {/* Close Button */}
        <div
          onClick={onClose}
          className="top-4 right-4 absolute bg-red-500 rounded-full w-8 h-8 flex justify-center items-center duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
        >
          <img src="/icons/close.svg" alt="Close icon" width={10} height={10} />
        </div>
      </div>
    </div>
  );
}
