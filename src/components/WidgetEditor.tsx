import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface WidgetOption {
  id: string;
  name: string;
  imageLink: string;
  fields: { key: string; label: string; type: string }[];
}

interface WidgetEditorProps {
  onClose: () => void;
}

const widgetOptions: WidgetOption[] = [
  {
    id: "pixelfed",
    name: "Pixelfed",
    imageLink: "/widgeteditor/pixelfed.webp",
    fields: [
      { key: "instance", label: "Instance", type: "text" },
      { key: "username", label: "Username", type: "text" },
    ],
  },
  {
    id: "github",
    name: "GitHub",
    imageLink: "/widgeteditor/github.webp",
    fields: [{ key: "username", label: "Username", type: "text" }],
  },
  {
    id: "mastodon",
    name: "Mastodon",
    imageLink: "/widgeteditor/mastodon.svg",
    fields: [
      { key: "instance", label: "Instance", type: "text" },
      { key: "username", label: "Username", type: "text" },
    ],
  },
];

export default function WidgetEditor({ onClose }: WidgetEditorProps) {
  const [selectedWidget, setSelectedWidget] = useState<WidgetOption | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: { widgetId: string; formData: Record<string, string> }) => {
      const response = await fetch("/api/widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save widget");
      return response.json();
    },
    onSuccess: () => setMessage("Widget saved successfully!"),
    onError: () => setMessage("Failed to save widget."),
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
    mutation.mutate({ widgetId: selectedWidget.id, formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white w-[80%] h-[80%] rounded-2xl shadow-lg flex overflow-hidden">
        {/* Left Sidebar - Widget Options */}
        <div className="w-1/3 bg-gray-100 p-4 border-r">
          <h2 className="text-lg font-bold mb-4">Select a Widget</h2>
          <ul>
            {widgetOptions.map((widget) => (
              <li
                key={widget.id}
                className={`p-3 flex items-center gap-3 cursor-pointer rounded-lg ${
                  selectedWidget?.id === widget.id ? "bg-blue-200" : "hover:bg-gray-200"
                }`}
                onClick={() => handleSelectWidget(widget)}
              >
                <img src={widget.imageLink} alt={widget.name} className="w-8 h-8" />
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
              {selectedWidget.fields.map((field) => (
                <div key={field.key} className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    className="w-full p-2 border rounded"
                    value={formData[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                </div>
              ))}

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
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
          className="top-4 right-4 absolute bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
        >
          <img src="/icons/close.svg" alt="Close icon" width={10} height={10} />
        </div>
      </div>
    </div>
  );
}
