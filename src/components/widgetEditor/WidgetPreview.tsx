"use client";

import { WidgetFactory } from "@/lib/WidgetFactory";
import type { WidgetProps } from "@/types/widget-types";

interface WidgetPreviewProps {
  widget: WidgetProps;
  className?: string;
}

export function WidgetPreview({ widget, className = "" }: WidgetPreviewProps) {
  // Define the base unit size
  const UNIT_SIZE = 196;

  // Calculate explicit dimensions
  const width = widget.size.cols * UNIT_SIZE;
  const height = widget.size.rows * UNIT_SIZE;

  return (
    <div
      className={`w-full flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <div className="max-w-full overflow-auto p-4 flex justify-center">
        <div
          className="relative overflow-hidden transition-all duration-500 ease-in-out flex-shrink-0"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <div className="absolute inset-0">
            <WidgetFactory
              widget={widget}
              isOwner={false}
              deleteWidget={() => {}}
              editWidget={() => {}}
              preview={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
