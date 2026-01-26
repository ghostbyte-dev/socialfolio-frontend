"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import type { z } from "zod";

import { WidgetFactory } from "@/lib/WidgetFactory";
import { type WidgetProps, widgetSchemas } from "@/types/widget-types";
import { Button } from "../Button";
import { FormInput } from "../inputs/FormInput"; // Using your FormInput
import SingleSelect from "../inputs/SingleSelect";
import LocationInput from "../LocationInput";
import type { WidgetOption } from "./WidgetCreator";

interface WidgetPropsSelectorProps {
  selectedWidget: WidgetOption;
  handleSave: (formData: any, variant: number) => void;
  goBack: () => void;
}

export default function WidgetPropsSelector({
  selectedWidget,
  handleSave,
}: WidgetPropsSelectorProps) {
  const [variant, setVariant] = useState<number>(1);

  // 1. Determine the schema based on selection
  // Fallback to a loose schema if nothing is selected to prevent crashes
  const currentSchema = selectedWidget
    ? widgetSchemas[selectedWidget.id]
    : (null as unknown as z.ZodObject<any>);

  // 2. Initialize Hook Form
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: currentSchema ? zodResolver(currentSchema) : undefined,
    mode: "onTouched",
  });

  // 3. Watch form values for the Live Preview
  const watchedData = useWatch({ control });

  // 4. Reset form when the selected widget changes
  useEffect(() => {
    if (selectedWidget) {
      setVariant(1);

      // Build default values from the widget definition
      const defaults: Record<string, any> = {};
      selectedWidget.fields.forEach((field) => {
        if (field.defaultOption) defaults[field.key] = field.defaultOption;
      });

      reset(defaults);
    }
  }, [selectedWidget, reset]);

  // Helper for Image Upload
  const handleImageUpload = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          // Update the form value with the base64 string
          setValue(key, reader.result.toString(), { shouldValidate: true });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Construct data for the preview component
  const previewWidgetData: WidgetProps = {
    size: { cols: 1, rows: 1 },
    variant: variant,
    id: "preview",
    type: selectedWidget?.id ?? "weather",
    data: watchedData || {},
  };

  const onSubmit = (data: any) => {
    handleSave(data, variant);
  };

  // Generate Variant Options for Select
  const variantOptions = selectedWidget.variants.map((v) => ({
    value: v.index.toString(), // Select expects strings usually
    label: `Variant ${v.index}`,
  }));

  return (
    <div className="flex-1 p-8 h-full w-full overflow-y-scroll">
      <div className="mt-4">
        {/* Variant Selection */}
        <div className="mb-4">
          <SingleSelect
            label={`${selectedWidget.variants.length} available variant${selectedWidget.variants.length > 1 ? "s" : ""}`}
            options={variantOptions}
            value={variant.toString()}
            onValueChange={(val) => setVariant(Number(val))}
          />
        </div>

        {/* Dynamic Fields Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {selectedWidget.fields.map((field) => {
            const errorMessage = errors[field.key]?.message as
              | string
              | undefined;

            return (
              <div key={field.key}>
                {/* Text & Number Inputs */}
                {(field.type === "text" || field.type === "number") && (
                  <FormInput
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder ?? field.label}
                    error={errorMessage}
                    {...register(field.key, {
                      valueAsNumber: field.type === "number",
                    })}
                  />
                )}

                {/* Text Area */}
                {field.type === "textArea" && (
                  <div className="flex flex-col gap-1">
                    {/** biome-ignore lint/a11y/noLabelWithoutControl: <> */}
                    <label className="text-sm font-medium">{field.label}</label>
                    <textarea
                      className={`input bg-surface-container-high w-full ${errorMessage ? "border-red-500" : ""}`}
                      rows={3}
                      {...register(field.key)}
                    />
                    {errorMessage && (
                      <span className="text-xs text-red-500">
                        {errorMessage}
                      </span>
                    )}
                  </div>
                )}

                {/* Select Dropdown */}
                {field.type === "select" && field.options && (
                  <Controller
                    control={control}
                    name={field.key}
                    render={({ field: { onChange, value } }) => (
                      <SingleSelect
                        label={field.label}
                        options={field.options!.map((opt) => ({
                          value: opt,
                          label: opt,
                        }))}
                        value={value}
                        onValueChange={onChange}
                      />
                    )}
                  />
                )}

                {/* Image Upload */}
                {field.type === "image" && (
                  <div className="flex flex-col gap-1">
                    {/** biome-ignore lint/a11y/noLabelWithoutControl: <> */}
                    <label className="text-sm font-medium">{field.label}</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="input bg-surface-container-high w-full"
                      onChange={(e) => handleImageUpload(field.key, e)}
                    />
                    {errorMessage && (
                      <span className="text-xs text-red-500">
                        {errorMessage}
                      </span>
                    )}
                  </div>
                )}

                {/* Location Input */}
                {field.type === "location" && (
                  <div className="flex flex-col gap-1">
                    {/** biome-ignore lint/a11y/noLabelWithoutControl: <> */}
                    <label className="text-sm font-medium">{field.label}</label>
                    <LocationInput
                      onLocationChange={(place) => {
                        setValue(
                          field.key,
                          JSON.stringify({ lat: place.lat, lon: place.lon }),
                          { shouldValidate: true },
                        );
                      }}
                    />
                    {errorMessage && (
                      <span className="text-xs text-red-500">
                        {errorMessage}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Live Preview */}
          <div className="my-5">
            <p className="font-bold mb-2">Preview</p>
            <div className="h-48 w-48">
              <WidgetFactory
                isOwner={false}
                widget={previewWidgetData}
                deleteWidget={() => {}}
                preview={true}
                editWidget={() => {}}
              />
            </div>
          </div>

          <Button type="submit" label="Save Widget" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
}
