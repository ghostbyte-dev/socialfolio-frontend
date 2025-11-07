import { motion } from "motion/react";
import Image from "next/image";
import type { PixelfedData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface PixelfedWidgetProps {
  data: PixelfedData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function PixelfedWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: PixelfedWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`${data.instance}/@${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <motion.div
            className="w-1/2 h-1/2 relative"
            animate={{ rotate: 720 }}
            transition={{ type: "spring", bounce: 0.7, duration: 2 }}
          >
            <Image
              src="/widgets/pixelfed/pixelfed-logo.webp"
              alt="Pixelfed logo"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      )}
    </BaseWidget>
  );
}
