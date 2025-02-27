"use client";

import AuthNavbar from "@/components/AuthNavbar";
import Navbar from "@/components/Navbar";
import { WidgetFactory } from "@/lib/WidgetFactory";
import { WidgetProps } from "@/types/widget-types";

const liberapayWidgets: WidgetProps[] = [
  {
    id: "libera",
    type: "liberapay",
    variant: 1,
    size: {
      cols: 1,
      rows: 1,
    },
    data: {
      username: "Pixelix",
    },
  },
  {
    id: "pixelfed",
    type: "pixelfed",
    variant: 1,
    size: {
      cols: 1,
      rows: 1,
    },
    data: {
      instance: "pixelix.social",
      username: "Pixelix",
    },
  },
  {
    id: "mastodon",
    type: "mastodon",
    variant: 1,
    size: {
      cols: 1,
      rows: 1,
    },
    data: {
      instance: "mastodon.social",
      username: "Pixelix",
    },
  },
  {
    id: "github",
    type: "github",
    variant: 1,
    size: {
      cols: 1,
      rows: 1,
    },
    data: {
      username: "daniebeler",
    },
  },
  {
    id: "timezone",
    type: "localTime",
    variant: 2,
    size: {
      cols: 1,
      rows: 1,
    },
    data: {
      timezone: "Europe/Vienna",
    },
  },
  {
    id: "github-2",
    type: "github",
    variant: 2,
    size: {
      cols: 1,
      rows: 1,
    },
    data: {
      username: "daniebeler",
    },
  },
];

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="h-16">
        <Navbar />
      </div>
      <div
        className="w-full h-full flex flex-row flex-wrap p-6 items-center justify-center"
        style={{ height: "calc(100vh - 64px)" }}
      >
       
        <div className="basis-full sm:basis-1/2 lg:basis-1/2 flex items-center px-5  md:px-10 lg:px-20 max-w-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
