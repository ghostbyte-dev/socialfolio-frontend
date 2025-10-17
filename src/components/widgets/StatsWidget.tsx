import { BaseWidget } from "./BaseWidget";

interface StatsWidgetProps {
  stat: string;
  name: string;
  variant: number;
}

export function StatsWidget({ stat, name, variant }: StatsWidgetProps) {
  var additionalCSS = "";

  if (variant == 1) {
    additionalCSS = "bg-green-600";
  } else if (variant == 2) {
    additionalCSS = "bg-blue-600";
  } else if (variant == 3) {
    additionalCSS = "bg-orange-600";
  }

  return (
    <BaseWidget isOwner={false} deleteWidget={() => {}} editWidget={() => {}}>
      <div
        className={
          "h-full w-full flex flex-col text-white justify-center bg- items-center " +
          additionalCSS
        }
      >
        <span className="font-bold text-6xl">{stat}</span>
        <span className="mt-3">{name}</span>
      </div>
    </BaseWidget>
  );
}
