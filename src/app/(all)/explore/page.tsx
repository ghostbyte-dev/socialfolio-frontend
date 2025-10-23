import type { Metadata } from "next";
import ExploreUsers from "@/components/ExploreUsers";

export const metadata: Metadata = {
  title: "Explore - Discover amazing Socialfolio profiles",
  description:
    "Browse and discover Socialfolio profiles from across the Fediverse. Find creators, developers, and communities sharing all their socials in one place.",
  alternates: {
    canonical: "https://socialfolio.me/explore",
  },
};

export default function Explore() {
  return (
    <>
      <title>Explore - Socialfolio</title>

      <div className="items-center flex flex-col">
        <section className="flex flex-col items-center mb-20 mt-20">
          <h1 className="text-6xl font-bold mb-6 cursive-font">Explore</h1>
        </section>

        <ExploreUsers />
      </div>
    </>
  );
}
