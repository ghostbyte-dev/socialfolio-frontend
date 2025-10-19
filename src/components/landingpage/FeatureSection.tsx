import { Github, Layout, LockOpen, Search, Users } from "lucide-react";
import FeatureContainer from "./FeatureContainer";

export default function FeatureSection() {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: <>
    <section className="w-full text-on-surface relative mb-20" id="features">
      <div className="flex flex-col items-center content-wrapper mt-20">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl mt-10 lg:mt-20 font-bold mb-3">
          Your online identity, beautifully organized
        </h2>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg mb-6 text-center">
            Highlight your social links, projects, and passions — all in one
            minimal and flexible space.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Customizable Layouts */}
          <FeatureContainer
            title="Customizable Layouts"
            description="Make your Socialfolio truly yours. Choose layouts, colors, and widget styles that fit your personal brand or aesthetic."
            icon={Layout}
          />

          {/* 2. Unified Profiles */}
          <FeatureContainer
            title="Unified Profiles"
            description="Bring all your social links, websites, and projects together in one elegant profile — from Mastodon to GitHub to Bluesky."
            icon={Users}
          />

          <FeatureContainer
            title="Explore & Discover"
            description="Find inspiration and connect with others. Browse beautifully crafted profiles from creators, developers, and communities across the Fediverse — all in one place. See how others express their online identity and share your own with the world."
            icon={Search}
          />

          {/* 4. Open & Evolving */}
          <FeatureContainer
            title="Open & Evolving"
            description="Build by the community, for the community. Socialfolio is open-source and constantly improving with your feedback."
            icon={LockOpen}
            button={
              <a
                href="https://github.com/ghostbyte-dev/socialfolio-frontend"
                className="bg-primary w-fit text-black hover:bg-primary-high border-none rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex items-center px-4 py-2"
              >
                <Github className="mr-2 h-4 w-4" />
                View on Github
              </a>
            }
          />
        </div>
      </div>
    </section>
  );
}
