"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";
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

  useEffect(() => {
    if (apiData) {
      console.log("Pixelfed API Data Updated:", apiData);
    }
  }, [apiData]);

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
        <div className="h-full w-full p-6 sm:p-5 md:p-8 flex flex-col justify-between">
          <div className="flex flex-row gap-4 items-center">
            <motion.div
              className="w-10 h-10 sm:w-16 sm:h-16 relative"
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

            <span className="text-md sm:text-xl font-bold">Pixelfed</span>
          </div>

          <div className="grid grid-cols-3 grid-rows-2 gap-2">
            {Array.from({ length: 6 }).map((_, index) => {
              const post = widgetApiData?.posts?.[index];

              // logic for outer corner rounding
              const cornerClasses = [
                "rounded-tl-2xl", // Index 0: Top Left
                "", // Index 1: Middle Top
                "rounded-tr-2xl", // Index 2: Top Right
                "rounded-bl-2xl", // Index 3: Bottom Left
                "", // Index 4: Middle Bottom
                "rounded-br-2xl", // Index 5: Bottom Right
              ][index];

              return (
                <div
                  key={post?.id || `placeholder-${index}`}
                  className={`relative w-full h-full aspect-square bg-muted overflow-hidden bg-zinc-100 dark:bg-zinc-800 ${cornerClasses} rounded-sm`}
                >
                  {post ? (
                    <Image
                      src={post.url}
                      alt={`Pixelfed post ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 10vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <div className="w-1/2 h-1/2 border-2 border-dashed border-current rounded-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {apiError && <p>{apiError.message}</p>}
          {widgetApiDataIsLoading && <p>Loading...</p>}
        </div>
      )}
    </BaseWidget>
  );
}
