import Link from "next/link";
import ExploreProfileButton from "./ExploreProfileButton";

export default function ExploreSection() {
  return (
    <section className="mt-20 w-full bg-primary text-on-primary py-20">
      <div className="flex flex-col items-center content-wrapper">
        <h2 className="text-center text-4xl md:text-5xl lg:text-5xl font-bold mb-3 cursive-font">
          Explore other Socialfolios
        </h2>

        <div className="w-full flex justify-center mt-5 mb-8 space-x-5">
          <ExploreProfileButton
            image="/landingpage/avatars/daniebeler.webp"
            username="daniebeler"
          />

          <ExploreProfileButton
            image="/landingpage/avatars/hiebeler05.webp"
            username="hiebeler05"
          />

          <ExploreProfileButton
            image="/landingpage/avatars/ghostbyte.png"
            username="ghostbyte"
          />
        </div>

        <Link
          href="/explore"
          className="button bg-surface text-on-surface rounded-xl"
        >
          <span className="relative z-10 transition-colors duration-300 ease-in-out">
            Explore all
          </span>
        </Link>
      </div>
    </section>
  );
}
