import Button from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center flex flex-col">
      <section className="min-h-[70vh] flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-6">
          Your Fediverse Portfolio, Simplified.
        </h1>
        <h2 className="text-3xl mb-6">
          Create a beautiful portfolio to share your projects, links, and social
          media. Open-source, privacy-friendly, and fully customizable.
        </h2>

        <Button link="/auth/login">Get Started</Button>
      </section>
    </div>
  );
}
