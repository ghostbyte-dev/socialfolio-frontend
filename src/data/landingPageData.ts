import { WidgetProps } from "@/types/widget-types";

export const landingpageWidgets: WidgetProps[] = [
  {
    id: "libera",
    type: "liberapay",
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
    id: "pixelfed",
    type: "pixelfed",
    variant: 1,
    size: {
      cols: 1,
      rows: 1,
    },
    data: {
      instance: "https://pixelix.social",
      username: "daniebeler",
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
      instance: "https://techhub.social",
      username: "socialfolio",
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