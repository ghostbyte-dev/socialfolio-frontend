import Link from "next/link";
import { Button } from "../Button";
import ExploreProfileButton from "./ExploreProfileButton";

export default function ExploreSection() {
  return (
    <section className="mt-20 w-full bg-primary text-on-primary py-20 selection:bg-surface selection:text-on-surface">
      <div className="flex flex-col items-center content-wrapper">
        <h2 className="text-center text-4xl md:text-5xl lg:text-5xl font-bold mb-3 cursive-font">
          Explore other Socialfolios
        </h2>

        <div className="w-full flex flex-wrap justify-center mt-5 mb-8">
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

          <ExploreProfileButton
            image="/landingpage/avatars/pixelix.webp"
            username="pixelix"
          />

          <ExploreProfileButton
            image="/landingpage/avatars/socialfolio.webp"
            username="socialfolio"
          />
        </div>

        <Button href="/explore" variant="surface" label="Explore all" />
      </div>
    </section>
  );
}
