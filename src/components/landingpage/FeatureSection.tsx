import Button from "../Button";

export default function FeatureSection() {
  return (
    <section className="w-full text-on-surface relative mb-20">
      <div className="flex flex-col items-center max-w-7xl w-4/5 mx-auto mt-20">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl mt-10 lg:mt-20 font-bold mb-3">
          Your online identity, beautifully organized
        </h2>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg mb-6 text-center">
            Highlight your social links, projects, and passions — all in one
            minimal and flexible space.
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Customizable Layouts */}
          <div className="rounded-3xl bg-green-400 text-black px-5 py-10">
            <h3 className="text-2xl font-bold mb-3">Customizable Layouts</h3>
            <p>
              Make your Socialfolio truly yours. Choose layouts, colors, and
              widget styles that fit your personal brand or aesthetic.
            </p>
          </div>

          {/* 2. Unified Profiles */}
          <div className="rounded-3xl bg-yellow-400 text-black px-5 py-10">
            <h3 className="text-2xl font-bold mb-3">Unified Profiles</h3>
            <p>
              Bring all your social links, websites, and projects together in
              one elegant profile — from Mastodon to GitHub to Bluesky.
            </p>
          </div>

          {/* 3. Privacy First */}
          <div className="rounded-3xl bg-blue-400 text-white px-5 py-10">
            <h3 className="text-2xl font-bold mb-3">Privacy First</h3>
            <p>
              Socialfolio never tracks or sells your data. You stay in control —
              always.
            </p>
          </div>

          {/* 4. Open & Evolving */}
          <div className="rounded-3xl bg-purple-500 text-white px-5 py-10">
            <h3 className="text-2xl font-bold mb-3">Open & Evolving</h3>
            <p>
              Built by the community, for the community. Socialfolio is
              open-source and constantly improving with your feedback.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
