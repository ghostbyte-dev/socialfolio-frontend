import { WidgetProps } from "@/types/widget-types";

interface ISize {
    cols: number;
    rows: number;
}

interface IPixelfed {
    baseUrl: string;
    username: string;
}

interface IMastodon {
    baseUrl: string;
    username: string;
}

export interface ICreateWidgetRequest {
    type: string;
    variant: number;
    size: ISize;
    data: Record<string, string>
}

interface ICreateWidgetResponse {
    id: string;
    type: string;
    variant: number;
    size: ISize;
    data: any;
}


const createWidget = async (
    data: ICreateWidgetRequest,
    jwt: string
): Promise<WidgetProps> => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/widgets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to create widget");

    const bodyRes = (await response.json()) as ICreateWidgetResponse;
    const transformedRes: WidgetProps = bodyRes;

    return transformedRes;
};

const getUsersWidgets = async (username: string): Promise<WidgetProps[]> => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/widgets/" + username + "/all"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
};


export const WidgetService = {
    createWidget,
    getUsersWidgets
};