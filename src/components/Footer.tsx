import Link from "next/link";

export default function Footer() {
  return (
    <>
      <section className="bg-primary py-30 mt-40 w-full flex justify-center text-on-primary">
        <div className="container flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold max-w-2xl px-5 text-center">
            Bring all your social profiles together in one place. Start your
            Socialfolio and let the world see you.
          </p>

          <Link
            href="/auth/register"
            className="bg-white rounded-full px-6 py-2 mt-4 relative"
          >
            Get started
          </Link>
        </div>
      </section>

      <footer className="w-full">
        <div className="bg-surface-container flex justify-center pt-20 pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 container px-5">
            <div className="mt-8">
              <h4 className="font-bold mb-3">Socialfolio</h4>
              <p className="text-slate-400 text-sm">
                Link All Your Socials in Style
              </p>
            </div>

            <div className="mt-8">
              <h4 className="font-bold mb-3">Account</h4>
              <nav className="text-slate-400 text-sm space-y-1 flex flex-col">
                <Link href="/auth/login" className="hover:text-text">
                  Log in
                </Link>
                <Link href="/auth/register" className="hover:text-text">
                  Sign up
                </Link>
                <Link href="/explore" className="hover:text-text">
                  Explore
                </Link>
              </nav>
            </div>

            <div className="mt-8">
              <h4 className="font-bold mb-3">Social</h4>
              <nav className="text-slate-400 text-sm space-y-1 flex flex-col">
                <Link
                  href="https://techhub.social/@socialfolio"
                  className="hover:text-text"
                >
                  Mastodon
                </Link>
                <Link
                  href="https://github.com/ghostbyte-dev/socialfolio-frontend"
                  className="hover:text-text"
                >
                  Github
                </Link>
                <Link href="/socialfolio" className="hover:text-text">
                  Socialfolio
                </Link>
              </nav>
            </div>

            <div className="mt-8">
              <h4 className="font-bold mb-3">Developers</h4>
              <nav className="text-slate-400 text-sm space-y-1 flex flex-col">
                <Link href="/ghostbyte" className="hover:text-text">
                  Ghostbyte
                </Link>
                <Link href="/daniebeler" className="hover:text-text">
                  Daniel
                </Link>
                <Link href="/hiebeler05" className="hover:text-text">
                  Emanuel
                </Link>
              </nav>
            </div>

            <div className="mt-8">
              <h4 className="font-bold mb-3">Legal</h4>
              <nav className="text-slate-400 text-sm space-y-1 flex flex-col">
                <Link href="/imprint" className="hover:text-text">
                  Imprint
                </Link>
                <Link href="/credits" className="hover:text-text">
                  Credits
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="p-3 w-full flex justify-center items-center bg-primary text-on-primary">
          <div className="text-center text-sm">
            <Link
              href="https://ghostbyte.dev"
              className="font-bold hover:underline"
            >
              A Ghostbyte Production
            </Link>{" "}
          </div>
        </div>
      </footer>
    </>
  );
}
