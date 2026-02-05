"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import type { z } from "zod";

import {
  type WidgetProps,
  type WidgetSize,
  widgetSchemas,
} from "@/types/widget-types"; // Import WidgetSize
import { Button } from "../Button";
import { FormInput } from "../inputs/FormInput";
import { FormTextarea } from "../inputs/FormTextarea";
import SingleSelect from "../inputs/SingleSelect";
import LocationInput from "../LocationInput";
import type { WidgetOption } from "./WidgetCreator";
import { WidgetPreview } from "./WidgetPreview";

interface WidgetPropsSelectorProps {
  selectedWidget: WidgetOption;
  // Updated signature to include size
  handleSave: (
    formData: any,
    variant: number,
    priority: number,
    size: WidgetSize,
  ) => void;
  goBack: () => void;
  initialData?: WidgetProps;
}

export default function WidgetPropsSelector({
  selectedWidget,
  handleSave,
  initialData,
}: WidgetPropsSelectorProps) {
  const [variant, setVariant] = useState<number>(initialData?.variant ?? 1);
  const [selectedSize, setSelectedSize] = useState<WidgetSize>(
    initialData?.size ?? selectedWidget.sizes[0] ?? { cols: 1, rows: 1 },
  );

  const [priority, setPriority] = useState<number>(initialData?.priority ?? 1);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<Record<string, any>>({
    resolver: widgetSchemas[selectedWidget.id as keyof typeof widgetSchemas]
      ? (zodResolver(
          widgetSchemas[selectedWidget.id as keyof typeof widgetSchemas],
        ) as any) // 👈 Add 'as any' here
      : undefined,
    mode: "onTouched",
    defaultValues: initialData?.data ?? {},
  });

  const watchedData = useWatch({ control });

  useEffect(() => {
    if (selectedWidget) {
      if (initialData) {
        // Edit Mode: Use existing values
        setVariant(initialData.variant);
        setSelectedSize(initialData.size);
        reset(initialData.data);
      } else {
        // Creation Mode: Use defaults
        setVariant(1);
        if (selectedWidget.sizes.length > 0)
          setSelectedSize(selectedWidget.sizes[0]);

        const defaults: Record<string, any> = {};
        selectedWidget.fields.forEach((field) => {
          if (field.defaultOption) defaults[field.key] = field.defaultOption;
        });
        reset(defaults);
      }
    }
  }, [selectedWidget, reset, initialData]);

  const handleImageUpload = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setValue(key, reader.result.toString(), { shouldValidate: true });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. Use selectedSize in the Preview
  const previewWidgetData: WidgetProps = {
    size: selectedSize,
    variant: variant,
    id: "preview",
    type: selectedWidget?.id ?? "weather",
    data: (watchedData as any) || {},
  };

  const onSubmit = (data: any) => {
    // 3. Pass selectedSize to handleSave
    handleSave(data, variant, priority, selectedSize);
  };

  const variantOptions = selectedWidget.variants.map((v) => ({
    value: v.index.toString(),
    label: `Variant ${v.index}`,
  }));

  // 4. Generate Size Options
  const sizeOptions = selectedWidget.sizes.map((s) => ({
    value: `${s.cols}x${s.rows}`,
    label: `${s.cols} Columns x ${s.rows} Rows`,
  }));

  return (
    <div className="flex-1 p-8 h-full w-full overflow-y-scroll">
      <div className="mt-4 space-y-4">
        {/* Size Selection */}
        <SingleSelect
          label="Widget Size"
          options={sizeOptions}
          value={`${selectedSize.cols}x${selectedSize.rows}`}
          onValueChange={(val) => {
            const [cols, rows] = val.split("x").map(Number);
            setSelectedSize({ cols, rows });
          }}
        />

        <FormInput
          label="Priority"
          type="number"
          value={priority}
          onChange={(e) => {
            setPriority(Number(e.target.value));
          }}
        />

        {/* Variant Selection */}
        <SingleSelect
          label={`${selectedWidget.variants.length} available variant${selectedWidget.variants.length > 1 ? "s" : ""}`}
          options={variantOptions}
          value={variant.toString()}
          onValueChange={(val) => setVariant(Number(val))}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {selectedWidget.fields.map((field) => {
            const errorMessage = errors[field.key]?.message as
              | string
              | undefined;

            return (
              <div key={field.key}>
                {(field.type === "text" || field.type === "number") && (
                  <FormInput
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder ?? field.label}
                    error={errorMessage}
                    {...register(field.key, {
                      valueAsNumber: field.type === "number",
                    })}
                    required={field.required ?? true}
                  />
                )}

                {field.type === "textArea" && (
                  <FormTextarea
                    label={field.label}
                    placeholder={field.placeholder ?? field.label}
                    error={errorMessage}
                    {...register(field.key)}
                  />
                )}

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

                {field.type === "image" && (
                  <div className="flex flex-col gap-1">
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

                {field.type === "location" && (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">{field.label}</label>
                    <LocationInput
                      onLocationChange={(place) => {
                        setValue("lon", place.lon, { shouldValidate: true });
                        setValue("lat", place.lat, { shouldValidate: true });
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

          <div className="my-5">
            <p className="font-bold mb-2">Preview</p>

            <WidgetPreview widget={previewWidgetData} />
          </div>

          <Button type="submit" label="Save Widget" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
}
