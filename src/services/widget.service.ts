import { ICreateWidgetRequest } from "@/components/WidgetEditor";
import { WidgetProps } from "@/types/widget-types";



const createWidget = async (data: ICreateWidgetRequest): Promise<WidgetProps> => {
    const response = await fetch(process.env.NEXTAUTH_URL + "/api/widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save widget");
      const bodyRes = response.json()
      return response.json();
}

export const WidgetService = {
    createWidget
};