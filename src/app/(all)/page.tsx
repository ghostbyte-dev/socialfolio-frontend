"use client";

import Button from "@/components/Button";
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

export default function Home() {
  return (
    <>
      <title>Socialfolio</title>
      <div className="items-center flex flex-col mb-20">
        <section className="min-h-[70vh] flex flex-col items-center">
          <h1 className="text-center text-3xl md:text-4xl lg:text-6xl mt-10 lg:mt-20 font-bold mb-6">
            Link All Your Socials in Style
          </h1>

          <div className="flex justify-center items-center my-10 md:my-20">
            <div className="flex max-w-screen">
              <div className="w-60 aspect-square rotate-[-10deg] translate-x-1/2 overflow-hidden">
                <WidgetFactory
                  widget={liberapayWidgets[0]}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                />
              </div>

              <div className="w-60 aspect-square rotate-[-5deg] translate-x-1/4">
                <WidgetFactory
                  widget={liberapayWidgets[1]}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                />
              </div>

              <div className="w-60 aspect-square">
                <WidgetFactory
                  widget={liberapayWidgets[2]}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                />
              </div>

              <div className="w-60 aspect-square rotate-[10deg] -translate-x-1/4">
                <WidgetFactory
                  widget={liberapayWidgets[3]}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                />
              </div>

              <div className="w-60 aspect-square rotate-[13deg] -translate-x-1/2 hidden md:block">
                <WidgetFactory
                  widget={liberapayWidgets[4]}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                />
              </div>

              <div className="w-60 aspect-square rotate-[10deg] translate-y-10 -translate-x-3/4 hidden md:block">
                <WidgetFactory
                  widget={liberapayWidgets[5]}
                  isOwner={false}
                  deleteWidget={() => {}}
                  editWidget={() => {}}
                />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl mb-6 text-center">
              A simple, open-source way to share your socials in one place
            </h2>
          </div>

          <Button link="/auth/login">Get Started</Button>
        </section>
      </div>
    </>
  );
}
