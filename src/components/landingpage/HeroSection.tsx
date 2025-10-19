import Button from "../Button";

export default function HeroSection({
  loggedInUsername,
}: {
  loggedInUsername: string | undefined;
}) {
  return (
    <section className="w-full bg-primary text-on-primary relative selection:bg-surface selection:text-on-surface">
      <div className="flex flex-col items-center content-wrapper mt-20">
        <h1 className="text-center text-4xl md:text-5xl lg:text-7xl mt-10 lg:mt-20 font-bold mb-6">
          Link All Your Socials in Style
        </h1>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl mb-6 text-center">
            A simple, open-source way to share your socials in one place
          </p>
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
          <a href={`/auth/login`}>
            <button
              type="button"
              className="button bg-surface text-on-surface rounded-xl"
            >
              <span className="relative z-10 transition-colors duration-300 ease-in-out">
                Get Started
              </span>
            </button>
          </a>
        )}

        <div className=" pt-20 z-20 mt-20">
          <div className="p-3 bg-surface-container-high rounded-t-2xl flex items-center space-x-4">
            <div className="space-x-1.5 hidden md:flex">
              <div className="bg-red-500 rounded-full h-4 w-4" />
              <div className="bg-yellow-500 rounded-full h-4 w-4" />
              <div className="bg-green-500 rounded-full h-4 w-4" />
            </div>

            <div className="wrapper md:w-fit px-3 py-1 md:px-6 text-on-surface text-center">
              <span className="text-gray-500">https://</span>
              socialfolio.me/daniebeler
            </div>
          </div>
          <img
            src="/img/screenshot3.png"
            alt=""
            className="w-full rounded-b-3xl borde border-primary shadow-yellow-500"
          />
        </div>
      </div>
      <div className="absolute z-0 bottom-0 left-0 right-0 h-20 md:h-40 lg:h-60 bg-gradient-to-b from-surface to-surface"></div>
    </section>
  );
}
