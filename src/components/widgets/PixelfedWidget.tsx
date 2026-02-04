import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import Image from "next/image";
import { WidgetService } from "@/services/widget.service";
import type { PixelfedData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface PixelfedWidgetProps {
  id: string;
  data: PixelfedData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
  preview?: boolean;
}

export interface PixelfedApiData {
  posts: PixelfedPost[];
}

interface PixelfedPost {
  id: string;
  url: string;
}

export function PixelfedWidget({
  id,
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
  preview = false,
}: PixelfedWidgetProps) {
  const needApiData = (): boolean => {
    if (variant === 1) {
      return false;
    } else {
      return true;
    }
  };

  const {
    data: apiData,
    isLoading: widgetApiDataIsLoading,
    error: apiError,
  } = useQuery<PixelfedApiData>({
    queryKey: ["pixelfedApiData", id],
    queryFn: () => WidgetService.getWidgetData(id) as Promise<PixelfedApiData>,
    enabled: needApiData() && id !== "",
  });

  const widgetApiData = preview
    ? {
        posts: [],
      }
    : apiData;

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
      {variant === 2 && (
        <div className="h-full w-full flex justify-center items-center">
          {apiError && <p>{apiError.message}</p>}
          {widgetApiDataIsLoading && <p>Loading...</p>}
          {widgetApiData?.posts?.length}
        </div>
      )}
    </BaseWidget>
  );
}
