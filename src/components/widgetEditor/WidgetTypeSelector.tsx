import Image from "next/image";
import type { WidgetCategory } from "@/data/widgetOptions"; // 2. Import the new type
// 1. Update import to use the new structure and name
import { widgetCategories } from "@/data/widgetOptions";
import type { WidgetOption } from "./WidgetCreator";

interface WidgetTypeSelectorProps {
  selectedWidget: WidgetOption | null;
  handleSelectWidget: (widget: WidgetOption) => void;
}

export default function WidgetTypeSelector({
  handleSelectWidget,
}: WidgetTypeSelectorProps) {
  return (
    <div className="w-full h-full p-4 border-r overflow-y-scroll">
      <div className="flex flex-col gap-8">
        {/* 3. Map over the categories */}
        {widgetCategories.map((category: WidgetCategory) => (
          <div key={category.name}>
            {/* Display the Category Name */}
            <h2 className="text-xl font-extrabold mb-4 text-primary dark:text-secondary border-b pb-2">
              {category.name}
            </h2>

            {/* 4. Map over the widgets within each category */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {category.widgets.map((widget) => (
                <button
                  key={widget.id}
                  onClick={() => handleSelectWidget(widget)}
                  type="button"
                  // I've added a few Tailwind classes for better visual separation and hover
                  className="flex flex-col justify-center items-center p-3 wrapper"
                >
                  {/* Logic for image remains the same */}
                  <Image
                    src={widget.imageLink}
                    alt={widget.name}
                    height={46}
                    width={46}
                    className="dark:hidden h-12"
                  />
                  <Image
                    src={widget.imageLinkDarkTheme}
                    alt={widget.name}
                    height={46}
                    width={46}
                    className="hidden dark:block h-12"
                  />
                  <p className="font-bold text-center mt-2 text-sm">
                    {widget.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
