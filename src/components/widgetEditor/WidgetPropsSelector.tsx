"use client";

import { WidgetOption } from "./WidgetCreator";
import { useEffect, useState } from "react";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import LocationInput from "../LocationInput";
import { WidgetProps } from "@/types/widget-types";
import { WidgetsGridDisplay } from "../WidgetsGrid";
import { WidgetFactory } from "@/lib/WidgetFactory";

interface WidgetPropsSelectorProps {
  selectedWidget: WidgetOption | null;
  handleSave: (formData: any, variant: number) => void;
  goBack: () => void;
}

export default function WidgetPropsSelector({
  selectedWidget,
  handleSave,
  goBack,
}: WidgetPropsSelectorProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [variant, setVariant] = useState<number>(1);
  const [widgetData, setWidgetData] = useState<WidgetProps>({
    size: { cols: 1, rows: 1 },
    variant: variant,
    id: "1",
    data: {},
    type: selectedWidget?.id ?? "weather",
  });

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

  const handleImageChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          handleChange(key, reader.result.toString(), "string");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setWidgetData((prev) => ({
      ...prev,
      variant: variant,
    }));
  }, [variant]);

  useEffect(() => {
    if (!selectedWidget) return;
    setVariant(1);
    setWidgetData((prev) => ({ ...prev, type: selectedWidget.id }));

    selectedWidget.fields.forEach((field) => {
      if (field.type === "select" && field.defaultOption) {
        handleChange(field.key, field.defaultOption, "string");
      }
    });
  }, [selectedWidget]);

  return (
    <div className={"flex-1 p-8 h-full w-full overflow-y-scroll " + (selectedWidget == null ? "" : "")}>
      <div className="flex">
        <button
          onClick={goBack}
          className="mr-2 md:hidden"
          aria-label="Back to widget type seletion"
        >
          <ArrowBack className="w-6 h-6" />
        </button>
        {selectedWidget != null && (
          <h2 className="text-xl font-bold">Create widget</h2>
        )}
      </div>

      {selectedWidget ? (
        <div className="mt-4">
          <div className="mb-4">
            <label className="block font-medium mb-2">Variant</label>
            <select
              className="input bg-surface-container-high w-full"
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
              <label className="block font-medium mb-2">{field.label}</label>
              {field.type === "select" ? (
                <select
                  className="input bg-surface-container-high w-full"
                  value={formData[field.key] || field.defaultOption}
                  onChange={(e) =>
                    handleChange(field.key, e.target.value, "string")
                  }
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type == "image" ? (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="input bg-surface-container-high w-full"
                    onChange={(e) => handleImageChange(field.key, e)}
                  />
                </div>
              ) : field.type == "location" ? (
                <LocationInput
                  onLocationChange={(place) => {
                    handleChange(
                      field.key,
                      JSON.stringify({ lat: place.lat, lon: place.lon }),
                      "string"
                    );
                  }}
                />
              ) : (
                <input
                  type={field.type}
                  className="input bg-surface-container-high w-full"
                  value={formData[field.key] ?? ""}
                  placeholder={field.placeholder ?? field.label}
                  onChange={(e) =>
                    handleChange(field.key, e.target.value, field.type)
                  }
                />
              )}
            </div>
          ))}

          <div className="h-48 w-48 mb-5">
            <WidgetFactory
              isOwner={false}
              widget={widgetData}
              deleteWidget={() => {}}
              preview={true}
              editWidget={() => {}}
            />
          </div>

          <button
            onClick={() => handleSave(formData, variant)}
            className="button"
            /* disabled={mutation.isPending} */
          >
            {/* {mutation.isPending ? "Saving..." : "Save Widget"} */}
            Save Widget
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img src="/illustrations/select.svg" className="h-96" height={400} />
          <p className="mt-4 font-bold">Select a widget to configure</p>
        </div>
      )}
    </div>
  );
}
