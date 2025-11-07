import { motion } from "motion/react";
import Image from "next/image";
import type { BuymeacoffeeData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface BuyMeACoffeeWidgetProps {
  data: BuymeacoffeeData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function BuyMeACoffeeWidget({
  data,
  variant,
  isOwner,
  deleteWidget,
  editWidget,
}: BuyMeACoffeeWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://buymeacoffee.com/${data.username}`}
    >
      {variant === 1 && (
        <motion.div
          className="h-full w-full flex justify-center items-center bg-[#ffdd00]"
          whileHover="hover"
        >
          <motion.div
            className="w-1/2 h-1/2 relative"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
            variants={{
              hover: {
                rotate: [
                  0,
                  -Math.random() * 10,
                  Math.random() * 10,
                  -Math.random() * 6,
                  Math.random() * 6,
                  0,
                ],
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                },
              },
            }}
          >
            <Image
              src="/widgets/buymeacoffee/buymeacoffee.svg"
              alt="Buy me a Coffee logo"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </BaseWidget>
  );
}
