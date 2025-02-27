import Button from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center flex flex-col">
      <section className="min-h-[70vh] flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-6">
          Your Fediverse Portfolio, Simplified.
        </h1>

        <div className="flex justify-center items-center h-72 my-20">
          <div className="absolute flex">
            {/* Left Widget */}

            <div className="w-60 h-60 bg-yellow-600 rounded-xl rotate-[-10deg] translate-x-1/2 overflow-hidden">
              <img
                src="/homepage/mastodon.png"
                height={240}
                width={240}
                alt=""
              />
            </div>

            <div className="w-60 h-60 bg-blue-500 rounded-xl rotate-[-5deg] translate-x-1/4"></div>

            {/* Center Widget */}
            <div className="w-60 h-60 bg-green-500 rounded-xl z-10"></div>

            {/* Right Widget */}
            <div className="w-60 h-60 bg-red-500 rounded-xl rotate-[10deg] -translate-x-1/4"></div>

            <div className="w-60 h-60 bg-yellow-600 rounded-xl rotate-[13deg] -translate-x-1/2 overflow-hidden">
              <img
                src="/homepage/mastodon.png"
                height={240}
                width={240}
                alt=""
              />
            </div>

            <div className="w-60 h-60 bg-red-500 rounded-xl rotate-[10deg] translate-y-10 -translate-x-3/4"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl mb-6">
            Create a beautiful portfolio to share your projects, links, and
            social media. Open-source, privacy-friendly, and fully customizable.
          </h2>
        </div>

        <Button link="/auth/login">Get Started</Button>
      </section>
    </div>
  );
}
