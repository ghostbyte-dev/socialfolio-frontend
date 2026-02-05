import type { WidgetApiData, WidgetProps } from "@/types/widget-types";

interface ISize {
  cols: number;
  rows: number;
}

export interface ICreateWidgetRequest {
  type: string;
  variant: number;
  size: ISize;
  priority: number;
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/widgets`, {
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

const deleteWidget = async (
  id: string,
  jwt: string
): Promise<any> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/widgets/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    }
  });

  if (!response.ok) throw new Error("Failed to delete widget");

  return response;
};

const getUsersWidgets = async (username: string, jwt: string | undefined): Promise<WidgetProps[]> => {
  const headers: HeadersInit = jwt ? {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  } : {}
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/widgets/${username}/all`, {
    headers: headers,
  }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
};

const getMastodonWidgets = async (username: string): Promise<WidgetProps[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/widgets/${username}/mastodon`,
  );
  console.log("ladöljkasdf")
  if (!res.ok) {
    return [];
  }
  console.log("hallo")
  return res.json();
};

const getWidgetData = async (id: string): Promise<WidgetApiData> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/widgets/${id}`);
  if (!res.ok) {
    let errorMessage = "";
    try {
      const json = await res.json();
      if (json.message) {
        errorMessage = json.message
      } else {
        throw new Error();
      };
    } catch (_e) {
      throw new Error("Failed to fetch user data");
    }
    throw new Error(errorMessage);
  }
  const json = await res.json()

  return json.data;
};

const updateWidget = async (
  data: WidgetProps,
  jwt: string
): Promise<WidgetProps> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/widgets/${data.id}`, {
    method: "PATCH",
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


export const WidgetService = {
  createWidget,
  deleteWidget,
  getUsersWidgets,
  getWidgetData,
  updateWidget,
  getMastodonWidgets
};