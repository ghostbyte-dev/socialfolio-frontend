import type { LucideIcon } from "lucide-react";
import { ReactElement } from "react";

export interface FeatureContainerProps {
    title: string;
    description: string;
    icon: LucideIcon;
    button?: ReactElement;
}

const FeatureContainer = (
    { title, description, icon: Icon, button }: FeatureContainerProps,
) => {
    return (
        <div className="rounded-3xl wrapper px-5 py-10">
            <div className="bg-primary p-4 w-min rounded-lg mb-4">
                <Icon size={28} color="#000" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p>
                {description}
            </p>
            <div className="mt-4">
                {button && <div>{button}</div>}
            </div>
        </div>
    );
};

export default FeatureContainer;
