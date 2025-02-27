"use client";

import AuthNavbar from "@/components/AuthNavbar";
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
        <AuthNavbar />
      </div>
      <div
        className="w-full h-full flex flex-row flex-wrap p-6 items-start sm:items-center"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="basis-full h-full sm:basis-1/2 px-5 sm:py-10 justify-center max-h-62 sm:max-h-none">
          <div className="h-36">
            <div className="flex absolute">
              <div className="w-40 h-40 rotate-[-5deg] overflow-hidden">
                <WidgetFactory
                  widget={liberapayWidgets[0]}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                />
              </div>

              <div className="w-40 h-40 rotate-[2deg] -translate-x-1/4">
                <WidgetFactory
                  widget={liberapayWidgets[1]}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                />
              </div>

              <div className="w-40 h-40 rotate-[2deg] -translate-x-1/4">
                <WidgetFactory
                  widget={liberapayWidgets[2]}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                />
              </div>

              <div className="w-40 h-40 rotate-[7deg] -translate-x-1/2">
                <WidgetFactory
                  widget={liberapayWidgets[3]}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                />
              </div>
            </div>
          </div>

          <div className="flex absolute">
            <div className="w-40 h-40 rotate-[-5deg] overflow-hidden">
              <WidgetFactory
                widget={liberapayWidgets[0]}
                isOwner={false}
                deleteWidget={() => {}}
                editWidget={() => {}}
              />
            </div>

            <div className="w-40 h-40 rotate-[2deg] -translate-x-1/4">
              <WidgetFactory
                widget={liberapayWidgets[1]}
                isOwner={false}
                deleteWidget={() => {}}
                editWidget={() => {}}
              />
            </div>

            <div className="w-40 h-40 rotate-[2deg] -translate-x-1/4">
              <WidgetFactory
                widget={liberapayWidgets[2]}
                isOwner={false}
                deleteWidget={() => {}}
                editWidget={() => {}}
              />
            </div>

            <div className="w-40 h-40 rotate-[7deg] -translate-x-1/2">
              <WidgetFactory
                widget={liberapayWidgets[3]}
                isOwner={false}
                deleteWidget={() => {}}
                editWidget={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="basis-full sm:basis-1/2 lg:basis-1/2 flex items-center px-5  md:px-10 lg:px-20 max-w-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
