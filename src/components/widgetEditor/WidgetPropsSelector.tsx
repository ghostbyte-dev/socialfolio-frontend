"use client";

import { WidgetOption } from "./WidgetCreator";
import { useEffect, useState } from "react";
import ArrowBack from "@/assets/icons/arrow-back.svg";

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
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [variant, setVariant] = useState<number>(1);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
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
          handleChange(key, reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
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
    <div className={"flex-1 p-8 " + (selectedWidget == null ? "" : "")}>
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
                  onChange={(e) => handleChange(field.key, e.target.value)}
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
                  {formData[field.key] && (
                    <img
                      src={formData[field.key]}
                      alt="Preview"
                      className="mt-2 max-h-40 rounded-lg shadow-md"
                    />
                  )}
                </div>
              ) : (
                <input
                  type={field.type}
                  className="input bg-surface-container-high w-full"
                  value={formData[field.key] ?? ""}
                  placeholder={field.placeholder ?? field.label}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              )}
            </div>
          ))}

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
