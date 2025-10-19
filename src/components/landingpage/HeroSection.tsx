import Button from "../Button";

export default function HeroSection({
  loggedInUsername,
}: {
  loggedInUsername: string | undefined;
}) {
  return (
    <section className="w-full bg-primary text-on-primary relative selection:bg-surface selection:text-on-surface">
      <div className="flex flex-col items-center content-wrapper mt-20">
        <h1 className="text-center text-3xl md:text-4xl lg:text-6xl mt-10 lg:mt-20 font-bold mb-6">
          Link All Your Socials in Style
        </h1>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl mb-6 text-center">
            A simple, open-source way to share your socials in one place
          </h2>
        </div>
        {loggedInUsername ? (
          <a href={`/${loggedInUsername}`}>
            <button
              type="button"
              className="button bg-surface text-on-surface rounded-xl"
            >
              <span className="relative z-10 transition-colors duration-300 ease-in-out">
                My profile
              </span>
            </button>
          </a>
        ) : (
          <Button link="/auth/login">Get Started</Button>
        )}

        <div className=" pt-20 z-20 mt-20">
          <img
            src="/img/screenshot3.png"
            alt=""
            className="w-full rounded-3xl border-2 border-primary shadow-yellow-500"
          />
        </div>
      </div>
      <div className="absolute z-0 bottom-0 left-0 right-0 h-20 md:h-40 lg:h-60 bg-gradient-to-b from-surface to-surface"></div>
    </section>
  );
}
