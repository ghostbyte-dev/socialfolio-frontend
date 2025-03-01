import { landingpageWidgets } from "@/data/landingPageData";
import { WidgetFactory } from "@/lib/WidgetFactory";
import Button from "../Button";

export default function HeroSection({
  loggedInUsername,
}: {
  loggedInUsername: string | undefined;
}) {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-center text-3xl md:text-4xl lg:text-6xl mt-10 lg:mt-20 font-bold mb-6">
        Link All Your Socials in Style
      </h1>

      <div className="flex justify-center items-center my-10 md:my-20">
        <div className="flex max-w-screen">
          <div className="w-60 aspect-square rotate-[-10deg] translate-x-1/2 overflow-hidden">
            <WidgetFactory
              widget={landingpageWidgets[0]}
              isOwner={false}
              deleteWidget={() => {}}
              editWidget={() => {}}
            />
          </div>

          <div className="w-60 aspect-square rotate-[-5deg] translate-x-1/4">
            <WidgetFactory
              widget={landingpageWidgets[1]}
              isOwner={false}
              deleteWidget={() => {}}
              editWidget={() => {}}
            />
          </div>

          <div className="w-60 aspect-square">
            <WidgetFactory
              widget={landingpageWidgets[2]}
              isOwner={false}
              deleteWidget={() => {}}
              editWidget={() => {}}
            />
          </div>

          <div className="w-60 aspect-square rotate-[10deg] -translate-x-1/4">
            <WidgetFactory
              widget={landingpageWidgets[3]}
              isOwner={false}
              deleteWidget={() => {}}
              editWidget={() => {}}
            />
          </div>

          <div className="w-60 aspect-square rotate-[13deg] -translate-x-1/2 hidden md:block">
            <WidgetFactory
              widget={landingpageWidgets[4]}
              isOwner={false}
              deleteWidget={() => {}}
              editWidget={() => {}}
            />
          </div>

          <div className="w-60 aspect-square rotate-[10deg] translate-y-10 -translate-x-3/4 hidden md:block">
            <WidgetFactory
              widget={landingpageWidgets[5]}
              isOwner={false}
              deleteWidget={() => {}}
              editWidget={() => {}}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl mb-6 text-center">
          A simple, open-source way to share your socials in one place
        </h2>
      </div>
      {loggedInUsername ? (
        <Button link={"/" + loggedInUsername}>My Profile</Button>
      ) : (
        <Button link="/auth/login">Get Started</Button>
      )}
    </section>
  );
}
