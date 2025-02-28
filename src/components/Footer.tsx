import Link from "next/link";

export default function Footer() {
  return (
    <nav className="bg-surface-container">
      <div className="p-4 flex justify-evenly items-center">
        <div className="flex flex-col">
          <Link href="/imprint" className="mb-3 font-bold hover:underline">
            Imprint
          </Link>
          <Link href="/credits" className=" font-bold hover:underline">
            Credits
          </Link>
        </div>

        <div>
          <span className="text-xl font-bold">Stay up to date:</span>
          <div className="mt-3 flex">
            <Link href="https://techhub.social/@socialfolio">
              <img
                className="mr-3"
                src="/icons/mastodon.svg"
                alt="Mastodon logo"
                height={45}
                width={45}
              ></img>
            </Link>

            <Link href="https://github.com/Hiebeler/socialfolio-frontend">
              <img
                src="/icons/github-logo-dark.webp"
                alt="Github logo"
                height={45}
                width={45}
                className="dark:hidden"
              ></img>
              <img
                src="/icons/github-logo-white.webp"
                alt="Github logo"
                height={45}
                width={45}
                className="light:hidden"
              ></img>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 w-full flex justify-center items-center">
        <div className="text-center">
          Developed with 💙 by{" "}
          <Link href="/daniebeler" className="font-bold hover:underline">
            Daniel
          </Link>{" "}
          and{" "}
          <Link href="/hiebeler05" className="font-bold hover:underline">
            Emanuel
          </Link>
        </div>
      </div>
    </nav>
  );
}
